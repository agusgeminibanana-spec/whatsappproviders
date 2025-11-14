import { whatsAppService } from './whatsapp.service';
import { db } from '../../config/firebase';
import * as admin from 'firebase-admin';

class ChatService {
  public async sendMessage(chatId: string, text: string) {
    // First, send the message via WhatsApp
    await whatsAppService.sendMessage(chatId, text);

    // Then, save the message to Firestore
    const chatRef = db().collection('chats').doc(chatId);
    const messagesRef = chatRef.collection('messages');
    const messageId = messagesRef.doc().id; // Generate a new ID

    const messageData = {
      id: messageId,
      fromMe: true, // Message is from us
      text: text,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    await messagesRef.doc(messageId).set(messageData);

    // Update the last message on the chat
    await chatRef.set({
      lastMessage: text,
      timestamp: messageData.timestamp,
    }, { merge: true });
  }
}

export const chatService = new ChatService();
