
import makeWASocket, { useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } from  '@whiskeysockets/baileys' 
import { Boom } from  '@hapi/boom' 
import P from  'pino' 
import qrcode from 'qrcode-terminal'
import admin from 'firebase-admin';

// Initialize Firebase Admin
try {
  admin.initializeApp({
    projectId: 'premium-ember-475717-c9'
  });
} catch (e) {
  console.log('Firebase already initialized');
}

const db = admin.firestore();

async  function  startBot ( ) { 
  const { state, saveCreds } = await  useMultiFileAuthState ( 'auth' ) 
  const { version } = await  fetchLatestBaileysVersion () 

  const sock = makeWASocket ({ 
    version, 
    auth : state, 
    logger : P ({ level : 'silent' })
   }) 

  sock. ev . on ( 'creds.update' , saveCreds) 

  sock. ev . on ( 'connection.update' , async ( { connection, lastDisconnect, qr } ) => { 
    if(qr) {
      // Print QR to terminal
      qrcode.generate(qr, {small: true});
      
      // Save QR to Firestore
      try {
        await db.collection('qrcodes').doc('whatsapp-link').set({
          qrString: qr,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ QR code saved to Firestore');
        console.log('QR Code String:', qr);
      } catch (error) {
        console.error('Error saving QR to Firestore:', error);
      }
    }

    if ( connection === 'close' ) { 
      const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
      if (shouldReconnect) {
        startBot()
      }
    } else if (connection === 'open' ) { 
      console.log ( ' ✅ ¡ Conectado a WhatsApp! ' ) 
      // Clear the QR when connection is successful
      await db.collection('qrcodes').doc('whatsapp-link').delete();
    }
  })
  
  sock.ev. on ( 'messages.upsert' , async ({ messages }) => { 
    const msg = messages[ 0 ] 
    if ( ! msg.key.fromMe && msg.message?.conversation ) { 
      const sender = msg.key.remoteJid 
      const text = msg.message.conversation.toLowerCase()
      console.log ( ` 📩 Mensaje de ${ sender } : ${text} ` )

       if (text === 'hi' ) {
         await sock. sendMessage (sender, { text : '¡Hola! ¿En qué puedo ayudarte hoy?' })
      }
    }
  })
}

startBot()
