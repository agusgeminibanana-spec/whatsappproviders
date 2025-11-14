
import partenza, { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import { db } from '../../config/firebase.js';
import admin from 'firebase-admin';
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
  }

  private setupEventListeners() {
    this.sock.ev.on('connection.update', async (update: any) => {
        const { connection, lastDisconnect, qr } = update;
  
        if (qr) {
          await this.sessionDocRef.set({ 
              status: 'pending',
              qr: qr,
              lastUpdated: admin.firestore.FieldValue.serverTimestamp()
          });
        }
  
        if (connection === 'close') {
          const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
          if (shouldReconnect) {
            this.init();
          } else {
            await this.sessionDocRef.set({ 
                status: 'disconnected',
                qr: null,
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            });
            await this.cleanupSession();
          }
        } else if (connection === 'open') {
          await this.sessionDocRef.set({ 
              status: 'connected',
              qr: null,
              lastUpdated: admin.firestore.FieldValue.serverTimestamp()
          });
        }
      });

      this.sock.ev.on('messages.upsert', async (m: any) => {
        const msgInfo = m.messages[0];
        if (!msgInfo.message || msgInfo.key.remoteJid === 'status@broadcast') return;
      
        const chatId = msgInfo.key.remoteJid!;
        const messageContent = msgInfo.message.conversation || msgInfo.message.extendedTextMessage?.text || '';
        if (!messageContent.trim()) return;
      
        const chatRef = db().collection('chats').doc(chatId);
        const messagesRef = chatRef.collection('messages');
      
        try {
          await db().runTransaction(async (transaction) => {
            const chatDoc = await transaction.get(chatRef);
            const messageData = {
              id: msgInfo.key.id,
              fromMe: msgInfo.key.fromMe,
              text: messageContent,
              timestamp: admin.firestore.Timestamp.fromMillis(Number(msgInfo.messageTimestamp) * 1000),
            };
            transaction.set(messagesRef.doc(msgInfo.key.id!), messageData);
      
            const chatData: any = {
              id: chatId,
              lastMessage: messageContent,
              timestamp: admin.firestore.Timestamp.fromMillis(Number(msgInfo.messageTimestamp) * 1000),
              unreadCount: msgInfo.key.fromMe ? 0 : (chatDoc.data()?.unreadCount || 0) + 1,
            };

            if (!chatDoc.exists || !chatDoc.data()?.name || chatDoc.data()?.name === chatId.split('@')[0]) {
                chatData.name = msgInfo.pushName || chatId.split('@')[0];
            }
      
            transaction.set(chatRef, chatData, { merge: true });
          });
        } catch (error) {
          console.error(`Failed to save message:`, error);
        }
      });
  }

  private async cleanupSession() {
    try {
      await fs.rm(path.resolve(SESSION_DIR), { recursive: true, force: true });
    } catch (error) {
      console.error('Error during session cleanup:', error);
    }
  }

  public async logout() {
    if (this.sock) {
      await this.sock.logout();
      this.sock = null;
    }
    await this.cleanupSession();
    await this.sessionDocRef.set({
      status: 'disconnected',
      qr: null,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  public async sendMessage(chatId: string, text: string) {
    if (this.sock && this.sock.user) {
        const result = await this.sock.sendMessage(chatId, { text });
        if (!result) {
            throw new Error('Message sending failed');
        }
    } else {
        throw new Error('Socket not connected');
    }
  }
}

export const whatsAppService = new WhatsAppService();
