
import { whatsAppService } from './whatsapp.service.js';
import { db } from '../../config/firebase.js';
import admin from 'firebase-admin';

class ChatService {
  public async sendMessage(chatId: string, text: string) {
    await whatsAppService.sendMessage(chatId, text);

    const chatRef = db().collection('chats').doc(chatId);
    const messagesRef = chatRef.collection('messages');
    const messageId = messagesRef.doc().id;

    const messageData = {
      id: messageId,
      fromMe: true,
      text: text,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    await messagesRef.doc(messageId).set(messageData);

    await chatRef.set({
      lastMessage: text,
      timestamp: messageData.timestamp,
    }, { merge: true });
  }
}

export const chatService = new ChatService();
