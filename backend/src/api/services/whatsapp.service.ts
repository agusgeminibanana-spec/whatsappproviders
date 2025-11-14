
import partenza, { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import { db } from '../../config/firebase';
import * as admin from 'firebase-admin';
import fs from 'fs/promises';
import path from 'path';

const SESSION_DIR = 'baileys_auth_info';

class WhatsAppService {
  private sock: any;
  private sessionDocRef = db().collection('whatsapp_sessions').doc('fusion-app');

  public async init() {
    const { state, saveCreds } = await useMultiFileAuthState(SESSION_DIR);
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`Using WA v${version.join('.')}, isLatest: ${isLatest}`);

    this.sock = partenza({
      version,
      auth: state,
      printQRInTerminal: false,
    });

    this.sock.ev.on('creds.update', saveCreds);
    this.setupEventListeners();
    this.listenForOutgoingMessages();
  }

  private setupEventListeners() {
    this.sock.ev.on('connection.update', async (update: any) => {
        const { connection, lastDisconnect, qr } = update;
  
        if (qr) {
          console.log('QR code received, updating session document...');
          await this.sessionDocRef.set({ 
              status: 'pending',
              qr: qr,
              lastUpdated: admin.firestore.FieldValue.serverTimestamp()
          });
          console.log('Session document updated with new QR code.');
        }
  
        if (connection === 'close') {
          const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
          console.log('Connection closed due to', lastDisconnect?.error, ', reconnecting:', shouldReconnect);
          if (shouldReconnect) {
            // Use a brief delay before attempting to re-initialize to prevent rapid loops
            setTimeout(() => this.init(), 5000);
          } else {
            console.log('Logged out. Setting session status to disconnected.');
            await this.sessionDocRef.set({ 
                status: 'disconnected',
                qr: null,
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            });
            // Optionally, we could also clean up the session files here
            // await this.cleanupSession();
          }
        } else if (connection === 'open') {
          console.log('Connection opened. Setting session status to connected.');
          await this.sessionDocRef.set({ 
              status: 'connected',
              qr: null,
              lastUpdated: admin.firestore.FieldValue.serverTimestamp()
          });
          console.log('Session status updated to connected.');
        }
      });

      this.sock.ev.on('messages.upsert', async (m: any) => {
        const msgInfo = m.messages[0];
        if (!msgInfo.message || msgInfo.key.remoteJid === 'status@broadcast') return;
      
        const chatId = msgInfo.key.remoteJid!;
        const messageContent = msgInfo.message.conversation || msgInfo.message.extendedTextMessage?.text || '';
        if (!messageContent.trim()) {
          console.log(`Ignoring empty message from ${chatId}`);
          return;
        }
      
        const chatRef = db().collection('chats').doc(chatId);
        const messagesRef = chatRef.collection('messages');
      
        try {
          await db().runTransaction(async (transaction: admin.firestore.Transaction) => {
            const chatDoc = await transaction.get(chatRef);
            const messageData = {
              id: msgInfo.key.id,
              fromMe: msgInfo.key.fromMe,
              text: messageContent,
              timestamp: admin.firestore.Timestamp.fromMillis(Number(msgInfo.messageTimestamp) * 1000),
            };
            transaction.set(messagesRef.doc(msgInfo.key.id), messageData);
      
            const currentUnreadCount = chatDoc.exists ? chatDoc.data()?.unreadCount || 0 : 0;
            const chatData = {
              id: chatId,
              name: msgInfo.pushName || chatId.split('@')[0],
              lastMessage: messageContent,
              timestamp: admin.firestore.Timestamp.fromMillis(Number(msgInfo.messageTimestamp) * 1000),
              unreadCount: msgInfo.key.fromMe ? 0 : currentUnreadCount + 1,
            };
            transaction.set(chatRef, chatData, { merge: true });
          });
          console.log(`Successfully saved message ${msgInfo.key.id} to chat ${chatId}`);
        } catch (error) {
          console.error(`Failed to save message:`, error);
        }
      });
  }

  private async cleanupSession() {
    try {
      const sessionDir = path.resolve(SESSION_DIR);
      const sessionExists = await fs.access(sessionDir).then(() => true).catch(() => false);
      if (sessionExists) {
        console.log(`Deleting session directory: ${sessionDir}`);
        await fs.rm(sessionDir, { recursive: true, force: true });
        console.log('Session directory deleted.');
      }
    } catch (error) {
      console.error('Error during session cleanup:', error);
    }
  }

  public async logout() {
    console.log('Starting logout process...');
    // Disconnect the socket
    if (this.sock) {
      await this.sock.logout();
      this.sock = null; // Clear the socket reference
    }
    // Clean up the session files
    await this.cleanupSession();
    // Update the status in Firestore
    await this.sessionDocRef.set({
      status: 'disconnected',
      qr: null,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log('Logout process completed. Ready for a new session.');
    // Re-initialize to get a new QR code
    this.init();
  }

  private listenForOutgoingMessages() {
    db().collection('outgoing_messages').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          const { chatId, text } = change.doc.data();
          if (chatId && text) {
            try {
              await this.sendMessage(chatId, text);
              await change.doc.ref.delete();
            } catch (error) {
              console.error(`Failed to send outgoing message:`, error);
            }
          }
        }
      });
    });
  }

  public async sendMessage(chatId: string, text: string) {
    if (this.sock && this.sock.user) {
        console.log(`Sending message to ${chatId}: "${text}"`);
        await this.sock.sendMessage(chatId, { text });
        console.log(`Successfully sent message to ${chatId}`);
    } else {
        console.error('Cannot send message, socket not connected or user not available.');
    }
  }
}

export const whatsAppService = new WhatsAppService();
