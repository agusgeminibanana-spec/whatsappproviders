import partenza, { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

const main = async () => {
    const { state, saveCreds } = await useMultiFileAuthState('baileys_auth_info');
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`);

    const sock = partenza({
        version,
        auth: state,
        printQRInTerminal: false,
    });

    // Listener for outgoing messages from the frontend
    const unsubscribeOutgoing = db.collection('outgoing_messages').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(async (change) => {
            if (change.type === 'added') {
                const { chatId, text } = change.doc.data();
                if (chatId && text) {
                    try {
                        console.log(`Sending message to ${chatId}: "${text}"`);
                        await sock.sendMessage(chatId, { text });
                        // Delete the document after sending
                        await change.doc.ref.delete();
                        console.log(`Successfully sent and deleted outgoing message ${change.doc.id}`);
                    } catch (error) {
                        console.error(`Failed to send message to ${chatId}:`, error);
                    }
                }
            }
        });
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        const qrDoc = db.collection('qrcodes').doc('whatsapp-link');
        const sessionDoc = db.collection('whatsapp_sessions').doc('fusion-app');

        if (qr) {
            console.log('QR code received, saving to Firestore...');
            await qrDoc.set({ qrString: qr });
            console.log('QR code saved to Firestore.');
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect);
            unsubscribeOutgoing(); // Stop listening for outgoing messages
            if (!shouldReconnect) {
                await qrDoc.delete().catch(err => console.error("Failed to delete QR doc on logout", err));
                await sessionDoc.delete().catch(err => console.error("Failed to delete session doc on logout", err));
            }
            if (shouldReconnect) {
                main();
            }
        } else if (connection === 'open') {
            console.log('opened connection');
            await sessionDoc.set({ connected: true, timestamp: admin.firestore.FieldValue.serverTimestamp() });
            console.log('Session document created/updated in Firestore.');
            await qrDoc.delete().catch(err => console.error("Failed to delete QR doc on connection", err));
            console.log('QR code deleted from Firestore.');
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        const msgInfo = m.messages[0];
        if (!msgInfo.message) return;
        const chatId = msgInfo.key.remoteJid!;
        if (chatId === 'status@broadcast') return;

        const messageContent = msgInfo.message.conversation || msgInfo.message.extendedTextMessage?.text || '';
        if (!messageContent && !msgInfo.message.contactMessage) return;

        const chatRef = db.collection('chats').doc(chatId);
        const messagesRef = chatRef.collection('messages');

        try {
            await db.runTransaction(async (transaction) => {
                const chatDoc = await transaction.get(chatRef);
                const messageData = {
                    id: msgInfo.key.id,
                    fromMe: msgInfo.key.fromMe,
                    text: messageContent,
                    timestamp: admin.firestore.Timestamp.fromMillis(Number(msgInfo.messageTimestamp) * 1000),
                };
                transaction.set(messagesRef.doc(msgInfo.key.id), messageData);

                const chatData = {
                    id: chatId,
                    name: msgInfo.pushName || chatId.split('@')[0],
                    lastMessage: messageContent,
                    timestamp: admin.firestore.Timestamp.fromMillis(Number(msgInfo.messageTimestamp) * 1000),
                    unreadCount: msgInfo.key.fromMe ? 0 : (chatDoc.data()?.unreadCount || 0) + 1,
                };
                transaction.set(chatRef, chatData, { merge: true });
            });
            console.log(`Successfully saved message ${msgInfo.key.id} to chat ${chatId}`);
        } catch (error) {
            console.error(`Failed to save message:`, error);
        }
    });
}

main();
