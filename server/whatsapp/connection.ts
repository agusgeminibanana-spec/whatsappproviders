import fs from "fs";
import path from "path";
import pino from "pino";
import { Boom } from "@hapi/boom";
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  WASocket,
} from "@whiskeysockets/baileys";
import { db } from "../firebase";

let whatsappSocket: WASocket | null = null;
const sessionName = process.env.WHATSAPP_SESSION || "fusion-app";
const authFolder = path.join(__dirname, "../../auth", sessionName);

/**
 * Initialize WhatsApp connection
 */
export async function initializeWhatsApp() {
  try {
    // Create credentials folder if it doesn't exist
    if (!fs.existsSync(authFolder)) {
      fs.mkdirSync(authFolder, { recursive: true });
    }

    // Handle credentials
    const { state, saveCreds } = await useMultiFileAuthState(authFolder);

    // Create socket
    whatsappSocket = makeWASocket({
      auth: state,
      logger: pino({ level: "error" }),
      printQRInTerminal: false,
    });

    // Connection update listener
    whatsappSocket.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect, qr } = update;
      const sessionRef = db.collection("whatsapp_sessions").doc(sessionName);

      if (qr) {
        await sessionRef.set({ qr, connected: false, updatedAt: new Date() });
      }

      // Handle disconnection
      if (connection === "close") {
        const isBoom = lastDisconnect?.error instanceof Boom;
        const reasonCode = isBoom
          ? (lastDisconnect.error as Boom).output?.statusCode
          : 0;
        const shouldReconnect = reasonCode !== DisconnectReason.loggedOut;

        await sessionRef.update({ connected: false, updatedAt: new Date() });
        console.error(
          `[WARN] Connection closed (session: ${sessionName}). Reconnecting: ${shouldReconnect}`,
        );

        if (shouldReconnect) {
          setTimeout(() => initializeWhatsApp(), 5000);
        } else {
          console.log(
            `[INFO] Session closed permanently. Delete /auth/${sessionName} to restart.`,
          );
          whatsappSocket = null;
        }
      } else if (connection === "open") {
        await sessionRef.set({
          connected: true,
          qr: null,
          updatedAt: new Date(),
        });
        console.log(`\n[OK] WhatsApp session "${sessionName}" connected.`);
      }
    });

    // Save credentials when they change
    whatsappSocket.ev.on("creds.update", saveCreds);

    // Incoming messages listener
    whatsappSocket.ev.on("messages.upsert", async ({ messages, type }) => {
      for (const msg of messages) {
        console.log(`[MESSAGE] From: ${msg.key.remoteJid}, Type: ${type}`);
      }
    });

    return whatsappSocket;
  } catch (error) {
    console.error(
      `[ERROR] Failed to initialize WhatsApp "${sessionName}":`,
      error,
    );
    throw error;
  }
}

/**
 * Get current socket
 */
export function getSocket() {
  if (!whatsappSocket) {
    throw new Error(
      "WhatsApp socket not initialized. Run initializeWhatsApp first.",
    );
  }
  return whatsappSocket;
}

/**
 * Check if connected
 */
export function isConnected() {
  return whatsappSocket?.socket?.readyState === 1;
}

/**
 * Close connection
 */
export async function closeConnection() {
  if (whatsappSocket) {
    await whatsappSocket.end(undefined);
    whatsappSocket = null;
    console.log(`[INFO] WhatsApp connection "${sessionName}" closed.`);
  }
}
