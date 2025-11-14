
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
    console.log("Destroying Baileys session for", sessionName);

    const sessionRef = db.collection("whatsapp_sessions").doc(sessionName);

    // Set connected to false and clear the QR code
    await sessionRef.update({
      connected: false,
      qr: FieldValue.delete(),
    });

    console.log("Firebase data related to the session has been cleaned up.");

    res.status(200).json({ message: "Logout successful, session data cleared." });
  } catch (error) {
    console.error("Error during WhatsApp logout:", error);
    res.status(500).json({ message: "Internal Server Error during logout." });
  }
};
