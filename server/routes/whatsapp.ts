import { RequestHandler } from "express";
import { db } from "../firebase";

const sessionName = process.env.WHATSAPP_SESSION || 'fusion-app';

export const handleQrCode: RequestHandler = async (req, res) => {
  try {
    const sessionRef = db.collection('whatsapp_sessions').doc(sessionName);
    const doc = await sessionRef.get();

    if (!doc.exists) {
      // Return a default state if the session document doesn't exist yet
      return res.json({ qr: null, connected: false });
    }

    const data = doc.data();
    res.json({ qr: data?.qr, connected: data?.connected });
  } catch (error) {
    console.error('Error fetching QR code from Firestore:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
