import { makeWASocket, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import fs from 'fs';
import QRCode from 'qrcode';

let socket: any;
let qrCodeData: string | null = null;

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            // Generate QR code as data URL
            try {
                qrCodeData = await QRCode.toDataURL(qr);
            } catch (err) {
                console.error('Error generating QR code', err);
            }
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect);
            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('opened connection');
            qrCodeData = null; // Clear QR code on connection
        }
    });

    sock.ev.on('messages.upsert', async m => {
        console.log(JSON.stringify(m, undefined, 2));
        
        // Example: Reply to messages
        const msg = m.messages[0];
        if (!msg.key.fromMe && m.type === 'notify') {
             console.log('replying to', msg.key.remoteJid);
             await sock.sendMessage(msg.key.remoteJid!, { text: 'Hello there!' });
        }
    });
    
    return sock;
}

export const initWhatsApp = async () => {
    if(!socket) {
        socket = await connectToWhatsApp();
    }
    return socket;
}

export const getSocket = () => socket;
export const getQrCode = () => qrCodeData;
