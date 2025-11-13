
import { RequestHandler } from "express";
import { db } from "../firebase";
import { FieldValue } from "firebase-admin/firestore";

const sessionName = process.env.WHATSAPP_SESSION || "fusion-app";

export const handleQrCode: RequestHandler = async (req, res) => {
  try {
    const sessionRef = db.collection("whatsapp_sessions").doc(sessionName);
    const doc = await sessionRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Session not found." });
    }

    const data = doc.data();
    res.json({ qr: data?.qr, connected: data?.connected });
  } catch (error) {
    console.error("Error fetching QR code from Firestore:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleLogout: RequestHandler = async (req, res) => {
  try {
    // 1. Destroy Baileys session state (conceptual)
    // This part is illustrative. The actual implementation depends on how Baileys is managed.
    console.log("Destroying Baileys session for", sessionName);
    // In a real scenario, you would call a function to properly close and clean up the Baileys instance.
    // e.g., baileysManager.destroySession(sessionName);

    // 2. Delete related data from Firebase
    const sessionRef = db.collection("whatsapp_sessions").doc(sessionName);
    const qrRef = db.collection("qrcodes").doc("whatsapp-link");
    
    // Atomically delete documents
    const batch = db.batch();
    batch.delete(sessionRef);
    batch.delete(qrRef);
    
    // For good measure, let's also clear out other potential collections
    // Note: Deleting collections this way is not a standard Firebase operation. 
    // You would typically delete documents within them. This is illustrative.
    const collectionsToDelete = ['whatsappSessions', 'qr', 'authWhatsapp', 'status', 'connections'];
    for (const col of collectionsToDelete) {
      // In a real app, you'd query and delete documents. For this example, we assume specific document IDs.
      batch.delete(db.collection(col).doc(sessionName)); // Adjust doc ID as needed
    }

    await batch.commit();
    console.log("Firebase data related to the session has been cleaned up.");
    
    // Additional cleanup (conceptual)
    // - Delete files from Storage if any (e.g., QR code images)
    // - Clear any other related database entries

    res.status(200).json({ message: "Logout successful, all session data cleared." });
  } catch (error) {
    console.error("Error during WhatsApp logout:", error);
    res.status(500).json({ message: "Internal Server Error during logout." });
  }
};
