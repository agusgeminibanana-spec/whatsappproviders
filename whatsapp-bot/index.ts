import partenza, { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import admin from 'firebase-admin';

// Initialize Firebase Admin
// It will automatically use the credentials from the environment
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

const main = async () => {
    const { state, saveCreds } = await useMultiFileAuthState('baileys_auth_info');
    // fetch latest version of WA Web
    const { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)


    const sock = partenza({
        version,
        auth: state,
        printQRInTerminal: false // We are handling the QR code manually
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        // Document path that the frontend is listening to
        const qrDoc = db.collection('qrcodes').doc('whatsapp-link');

        if (qr) {
            console.log('QR code received, saving to Firestore...');
            // Use the field name 'qrString' that the frontend expects
            await qrDoc.set({ 
                qrString: qr,
            });
            console.log('QR code saved to Firestore.');
        }

        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect);
            
            // If logged out, delete the QR document so the frontend doesn't show an old QR
            if (!shouldReconnect) {
                await qrDoc.delete().catch(err => console.error("Failed to delete QR doc on logout", err));
            }

            // reconnect if not logged out
            if(shouldReconnect) {
                main();
            }
        } else if(connection === 'open') {
            console.log('opened connection');
            // Connection is successful, delete the QR code document.
            // The frontend will detect this and navigate to the chats page.
            await qrDoc.delete().catch(err => console.error("Failed to delete QR doc on connection", err));
            console.log('Connection successful, QR code deleted from Firestore.');
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        console.log(JSON.stringify(m, undefined, 2));

        if (m.messages[0].key.fromMe) return;

        const msg = m.messages[0].message?.conversation;
        console.log('New message: ', msg);

        await sock.sendMessage(m.messages[0].key.remoteJid!, { text: 'Hello there!' });
    });
}

main();
