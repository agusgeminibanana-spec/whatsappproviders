
import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
} from "@airgram/baileys";
import { Boom } from "@hapi/boom";
import { db } from "../firebase";
import pino from "pino";

// Logger configuration
const logger = pino({ level: "info" });

// Session and database configuration
const sessionName = process.env.WHATSAPP_SESSION || "fusion-app";
const sessionRef = db.collection("whatsapp_sessions").doc(sessionName);
const qrRef = db.collection("qrcodes").doc("whatsapp-link");

let socket: ReturnType<typeof makeWASocket> | undefined;

/**
 * Cleans up all session data from Firebase, forcing a new QR scan.
 */
const cleanupFirebaseSession = async () => {
  console.log("Cleaning up Firebase session data...");
  const batch = db.batch();
  batch.delete(sessionRef);
  // **CRITICAL FIX**: Create the QR doc to signal logout to the frontend.
  // The frontend considers the session ended only when this doc EXISTS.
  batch.set(qrRef, { expired: true, timestamp: new Date() });
  await batch.commit();
  console.log("Firebase session data cleaned up. QR document created to force re-scan.");
};

/**
 * Initializes and connects the WhatsApp socket.
 */
export async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState(`auth/baileys/${sessionName}`);

  socket = makeWASocket({
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    printQRInTerminal: true,
    logger,
    browser: ["Fusiona CRM", "Desktop", "4.0"],
  });

  socket.ev.on("creds.update", saveCreds);

  socket.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("QR code generated. Saving to Firestore.");
      // When a new QR is available, ensure it is written to Firestore.
      await qrRef.set({ qr, connected: false, timestamp: new Date() });
    }

    if (connection === "open") {
      console.log("WhatsApp connection opened.");
      // Session is active, so the QR document must be deleted.
      await qrRef.delete(); 
      await sessionRef.set({ connected: true, timestamp: new Date() });
    }

    if (connection === "close") {
      const statusCode = (lastDisconnect?.error as Boom)?.output?.statusCode;
      console.error("Connection closed. Reason:", statusCode, lastDisconnect?.error);

      // This is the definitive logout signal.
      if (statusCode === DisconnectReason.loggedOut) {
        console.log("Logged out from WhatsApp. Cleaning up session...");
        await cleanupFirebaseSession();
        // Optional: you might want to stop the process or prevent reconnection here.
      } else {
        // For any other disconnection reason, attempt to reconnect.
        console.log("Reconnecting...");
        connectToWhatsApp();
      }
    }
  });

  return socket;
}

/**
 * Retrieves the current WhatsApp socket instance.
 */
export const getSocket = () => socket;
