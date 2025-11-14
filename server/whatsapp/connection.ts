
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import makeWASocket, {
  DisconnectReason,
  makeInMemoryStore,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import { db } from "../firebase"; // Ensure this path is correct

let sock: ReturnType<typeof makeWASocket> | undefined;
let qrCodeString: string | undefined;
const sessionDocRef = doc(db, "whatsapp_sessions", "fusion-app");

// Configure an in-memory store for Baileys
const store = makeInMemoryStore({});
store.readFromFile("./baileys_store.json");
// Save the store to a file every 10 seconds
setInterval(() => {
  store.writeToFile("./baileys_store.json");
}, 10_000);

async function connectToWhatsApp() {
  // If a socket already exists and is connected, do nothing.
  if (sock) {
    console.log("WhatsApp is already connected or connecting.");
    return;
  }

  console.log("Starting new WhatsApp connection...");
  const { state, saveCreds } = await useMultiFileAuthState("baileys_auth_info");

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: true, // This is useful for server-side debugging
  });

  // Pass the store to the socket
  store.bind(sock.ev);

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("QR code generated.");
      qrCodeString = qr;
      // Immediately update Firestore with the new QR code
      await setDoc(doc(db, "qrcodes", "whatsapp-link"), { qrString: qr, status: "pending" });
    } else if (qrCodeString && !qr) {
      // QR code was scanned, clear it
      qrCodeString = undefined;
      await deleteDoc(doc(db, "qrcodes", "whatsapp-link"));
    }

    if (connection === "open") {
      console.log("WhatsApp connection opened.");
      // Once connected, set the session document in Firestore
      await setDoc(sessionDocRef, { connected: true, timestamp: new Date() });
    } else if (connection === "close") {
      console.log("WhatsApp connection closed.");
      // Connection closed, delete the session document
      await deleteDoc(sessionDocRef);

      const shouldReconnect = 
        (lastDisconnect?.error as any)?.output?.statusCode !== DisconnectReason.loggedOut;
      
      console.log(
        `Connection closed due to: ${lastDisconnect?.error}, reconnecting: ${shouldReconnect}`
      );
      // Clear the socket
      sock = undefined;

      if (shouldReconnect) {
        console.log("Reconnecting...");
        setTimeout(connectToWhatsApp, 5000); // Add a delay before reconnecting
      } else {
        console.log("Not reconnecting, user logged out.");
        // Also clear QR doc on final logout
        await deleteDoc(doc(db, "qrcodes", "whatsapp-link")).catch(() => {});
      }
    }
  });

  sock.ev.on("messages.upsert", async (m) => {
    console.log("Received message:", JSON.stringify(m, undefined, 2));
    // You can add message processing logic here
  });
}

async function disconnectFromWhatsApp() {
  if (sock) {
    console.log("Disconnecting from WhatsApp...");
    await sock.logout();
    // The 'connection.update' event handler will manage the cleanup
    sock = undefined;
  }
  // As a final measure, ensure all session-related documents are deleted
  await deleteDoc(sessionDocRef).catch(e => console.error("Error deleting session doc", e));
  await deleteDoc(doc(db, "qrcodes", "whatsapp-link")).catch(e => console.error("Error deleting QR doc", e));
  console.log("WhatsApp cleanup complete.");
}

function getQrCode() {
  return qrCodeString;
}

// Automatically start the connection when the server boots up
connectToWhatsApp();

export { connectToWhatsApp, disconnectFromWhatsApp, getQrCode };
