/**
 * Archivo: server/whatsapp/connection.js
 * 
 * Descripción:
 *   Gestión de la conexión a WhatsApp usando Baileys.
 *   Maneja QR, autenticación y eventos de conexión.
 * 
 * Uso:
 *   Este módulo es cargado automáticamente por server/whatsapp/index.js
 */

const fs = require('fs');
const path = require('path');
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require('@whiskeysockets/baileys');

let whatsappSocket = null;
let qrCode = null;
const sessionName = process.env.WHATSAPP_SESSION || 'fusion-app';
const authFolder = path.join(__dirname, '../../auth', sessionName);

/**
 * Inicializar conexión a WhatsApp
 */
async function initializeWhatsApp() {
  try {
    // Crear carpeta de credenciales si no existe
    if (!fs.existsSync(authFolder)) {
      fs.mkdirSync(authFolder, { recursive: true });
    }

    // Manejo de credenciales
    const { state, saveCreds } = await useMultiFileAuthState(authFolder);

    // Crear socket
    whatsappSocket = makeWASocket({
      auth: state,
      logger: pino({ level: 'error' }),
      printQRInTerminal: false
    });

    // Listener de actualización de conexión
    whatsappSocket.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, qr } = update;

      qrCode = qr;

      // Manejo de desconexión
      if (connection === 'close') {
        const isBoom = lastDisconnect?.error instanceof Boom;
        const reasonCode = isBoom ? lastDisconnect.error.output?.statusCode : 0;
        const shouldReconnect = reasonCode !== DisconnectReason.loggedOut;

        console.error(`[WARN] Conexión cerrada (sesión: ${sessionName}). Reconectar: ${shouldReconnect}`);
        
        if (shouldReconnect) {
          setTimeout(() => initializeWhatsApp(), 5000);
        } else {
          console.log(`[INFO] Sesión cerrada definitivamente. Elimina /auth/${sessionName} para reiniciar.`);
          whatsappSocket = null;
        }
      } else if (connection === 'open') {
        console.log(`\n[OK] Sesión WhatsApp "${sessionName}" conectada.`);
      }
    });

    // Guardar credenciales cuando cambien
    whatsappSocket.ev.on('creds.update', saveCreds);

    // Listener de mensajes entrantes
    whatsappSocket.ev.on('messages.upsert', async ({ messages, type }) => {
      for (const msg of messages) {
        // Enviar evento a través de WebSocket o guardar en base de datos
        console.log(`[MENSAJE] De: ${msg.key.remoteJid}, Tipo: ${type}`);
        
        // Aquí se puede implementar lógica para:
        // - Guardar mensajes en BD
        // - Enviar a través de WebSocket
        // - Procesar automáticamente
      }
    });

    return whatsappSocket;

  } catch (error) {
    console.error(`[ERROR] No se pudo inicializar WhatsApp "${sessionName}":`, error);
    throw error;
  }
}

/**
 * Obtener socket actual
 */
function getSocket() {
  if (!whatsappSocket) {
    throw new Error('WhatsApp socket no inicializado. Ejecuta initializeWhatsApp primero.');
  }
  return whatsappSocket;
}

/**
 * Obtener QR
 */
function getQrCode() {
  return qrCode;
}

/**
 * Verificar si está conectado
 */
function isConnected() {
  return whatsappSocket && whatsappSocket.socket?.readyState === 1;
}

/**
 * Cerrar conexión
 */
async function closeConnection() {
  if (whatsappSocket) {
    await whatsappSocket.end();
    whatsappSocket = null;
    console.log(`[INFO] Conexión WhatsApp "${sessionName}" cerrada.`);
  }
}

module.exports = {
  initializeWhatsApp,
  getSocket,
  getQrCode,
  isConnected,
  closeConnection
};
