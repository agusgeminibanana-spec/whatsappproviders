import { Boom } from '@hapi/boom';
import QRCode from 'qrcode';
import { Timestamp } from 'firebase-admin/firestore';
import { db } from '../init-firebase';
import { useFirestoreAuthState } from './auth';

let socket: any;
let qrCodeData: string | null = null;
const SESSION_ID = 'default_session';

// Helper to wait for socket state
export const waitForSocketOpen = async (timeoutMs = 20000) => {
    if (socket?.ws?.isOpen) return true;

    // Trigger init if not exists
    if (!socket) initWhatsApp().catch(console.error);

    return new Promise<boolean>((resolve) => {
        const start = Date.now();
        const interval = setInterval(() => {
            if (socket?.ws?.isOpen) {
                clearInterval(interval);
                resolve(true);
            } else if (Date.now() - start > timeoutMs) {
                clearInterval(interval);
                resolve(false);
            }
        }, 500);
    });
};

async function createSocket() {
    const { makeWASocket, DisconnectReason, fetchLatestBaileysVersion } = await import('@whiskeysockets/baileys');
    const { state, saveCreds } = await useFirestoreAuthState(SESSION_ID);
    const { version } = await fetchLatestBaileysVersion();

    console.log(`Starting Baileys v${version.join('.')}`);

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: true,
        defaultQueryTimeoutMs: 60000,
        syncFullHistory: false,
        connectTimeoutMs: 60000,
        keepAliveIntervalMs: 30000, // Keep alive packet every 30s
        retryRequestDelayMs: 5000
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log("QR Code generated");
            try {
                qrCodeData = await QRCode.toDataURL(qr);
                await db.collection('whatsapp_status').doc('session').set({
                    qr: qrCodeData,
                    status: 'scanning',
                    timestamp: new Date()
                }, { merge: true });
            } catch (err) {
                console.error('Error generating QR code', err);
            }
        }

        if (connection === 'close') {
            qrCodeData = null;
            const reason = (lastDisconnect?.error as Boom)?.output?.statusCode;
            const shouldReconnect = reason !== DisconnectReason.loggedOut;
            
            console.log('Connection closed. Reason:', reason, 'Reconnecting:', shouldReconnect);
            
            await db.collection('whatsapp_status').doc('session').set({
                status: 'disconnected',
                qr: null,
                timestamp: new Date(),
                reconnecting: shouldReconnect
            }, { merge: true });

            // Explicitly clear socket ref so re-init creates a new one
            if (socket === sock) {
                socket = null;
            }

            if (shouldReconnect) {
                // Auto reconnect logic
                // Using a small delay to prevent rapid loops
                setTimeout(() => initWhatsApp(), 2000);
            } else {
                console.log('Session logged out. Clearing DB auth data...');
                await db.collection('whatsapp_auth').doc(SESSION_ID).delete();
            }
        } else if (connection === 'open') {
            console.log('Connection opened successfully');
            qrCodeData = null;
            socket = sock;
            
            await db.collection('whatsapp_status').doc('session').set({
                status: 'connected',
                qr: null,
                timestamp: new Date(),
                user: sock.user
            }, { merge: true });
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        try {
            const message = m.messages[0];
            if (!message.key.remoteJid) return;

            const jid = message.key.remoteJid;
            const isFromMe = message.key.fromMe;
            
            let messageContent = 'Unknown';
            if (message.message?.conversation) messageContent = message.message.conversation;
            else if (message.message?.extendedTextMessage?.text) messageContent = message.message.extendedTextMessage.text;
            else if (message.message?.imageMessage) messageContent = '📷 Image';
            
            const msgTime = typeof message.messageTimestamp === 'number' 
                ? message.messageTimestamp * 1000 
                : Date.now();
            const timestamp = new Date(msgTime);

            await db.collection('whatsapp_chats').doc(jid).collection('messages').doc(message.key.id!).set({
                id: message.key.id,
                fromMe: isFromMe,
                content: messageContent,
                timestamp: timestamp,
                pushName: message.pushName || null,
            }, { merge: true });

            await db.collection('whatsapp_chats').doc(jid).set({
                id: jid,
                lastMessage: messageContent,
                lastMessageTimestamp: timestamp,
                timestamp: Timestamp.fromDate(timestamp),
                name: message.pushName || jid.split('@')[0]
            }, { merge: true });

        } catch (error) {
            console.error('Error persisting message:', error);
        }
    });

    return sock;
}

// Singleton initialization promise to avoid race conditions
let initPromise: Promise<any> | null = null;

export const initWhatsApp = async () => {
    if (socket?.ws?.isOpen) return socket;
    
    if (initPromise) return initPromise;

    initPromise = createSocket().then(sock => {
        socket = sock;
        return sock;
    }).catch(err => {
        console.error("Init failed:", err);
        initPromise = null; // Allow retry
        throw err;
    });

    return initPromise;
}

export const getSocket = () => socket;
export const getQrCode = () => qrCodeData;

export const getChats = async () => {
    try {
        const snapshot = await db.collection('whatsapp_chats')
            .orderBy('lastMessageTimestamp', 'desc')
            .get();
        return snapshot.docs.map(doc => {
            const d = doc.data();
            if (d.timestamp?.toDate) d.timestamp = d.timestamp.toDate().toISOString();
            if (d.lastMessageTimestamp?.toDate) d.lastMessageTimestamp = d.lastMessageTimestamp.toDate().toISOString();
            return d;
        });
    } catch (error) {
        console.error("Error reading chats from DB:", error);
        return [];
    }
};
