import { Router } from "express";
import {
  initWhatsApp,
  getSocket,
  getChats,
  waitForSocketOpen,
} from "../whatsapp/connection";
import { db } from "../init-firebase";
import multer from "multer";

export const whatsappRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

const normalizeJid = (phone: string): string => {
  let id = phone;
  if (!id.includes("@")) {
    id = `${phone.replace(/\D/g, "")}@s.whatsapp.net`;
  }
  return id;
};

const ensureConnected = async (res: any): Promise<any> => {
  try {
    await initWhatsApp();
    const connected = await waitForSocketOpen();
    const sock = getSocket();
    if (!connected || !sock) {
      res.status(503).json({ error: "WhatsApp conectando... por favor reintenta." });
      return null;
    }
    return sock;
  } catch (e: any) {
    res.status(500).json({ error: "Falló la conexión: " + e.message });
    return null;
  }
};

whatsappRouter.get("/status", async (req, res) => {
  res.set("Cache-Control", "no-store");
  initWhatsApp().catch(console.error);
  try {
    const doc = await db.collection("whatsapp_status").doc("session").get();
    const data = doc.data();
    let finalStatus = data?.status || "disconnected";
    let qr = data?.qr || null;
    let user = data?.user || null;
    const sock = getSocket();
    if (sock?.ws?.isOpen) {
      finalStatus = "connected";
      if (sock.user) user = sock.user;
    }
    res.json({ status: finalStatus, qr, user });
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener el estado" });
  }
});

whatsappRouter.get("/chats", async (req, res) => {
  res.set("Cache-Control", "no-store");
  try {
    await initWhatsApp();
    const chats = await getChats();
    res.json({ success: true, data: chats });
  } catch (error) {
    res.status(500).json({ error: "No se pudieron cargar los chats" });
  }
});

whatsappRouter.get("/chats/:id/messages", async (req, res) => {
  res.set("Cache-Control", "no-store");
  const { id } = req.params;
  try {
    const snapshot = await db
      .collection("whatsapp_chats")
      .doc(decodeURIComponent(id))
      .collection("messages")
      .orderBy("timestamp", "asc")
      .get();
    const messages = snapshot.docs.map((doc) => {
      const d = doc.data();
      if (d.timestamp?.toDate) d.timestamp = d.timestamp.toDate().toISOString();
      return d;
    });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ error: "No se pudieron cargar los mensajes" });
  }
});

whatsappRouter.post("/send-message", async (req, res) => {
  const { phone, message } = req.body;
  const sock = await ensureConnected(res);
  if (!sock) return;
  try {
    await sock.sendMessage(normalizeJid(phone), { text: message });
    res.json({ success: true, message: "Mensaje enviado" });
  } catch (error: any) {
    res.status(500).json({ error: "Falló el envío: " + error.message });
  }
});

whatsappRouter.post(
  "/send-image",
  upload.single("image"),
  async (req, res) => {
    const { phone, caption } = req.body;
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No se proveyó imagen" });
      return;
    }
    const sock = await ensureConnected(res);
    if (!sock) return;
    try {
      await sock.sendMessage(normalizeJid(phone), {
        image: file.buffer,
        caption,
        mimetype: file.mimetype,
      });
      res.json({ success: true, message: "Imagen enviada" });
    } catch (error: any) {
      res.status(500).json({ error: "Falló el envío de imagen: " + error.message });
    }
  },
);

whatsappRouter.post("/suggest-reply", async (req, res) => {
  const { messages } = req.body;
  if (!messages) {
    res.status(400).json({ error: "No hay mensajes" });
    return;
  }
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const suggestions = [
      "¡Suena bien, gracias!",
      "Entendido, ¿cuál es el siguiente paso?",
      "Lo reviso y te confirmo.",
    ];
    res.json({ success: true, suggestions });
  } catch (error: any) {
    res.status(500).json({ error: "Fallaron las sugerencias: " + error.message });
  }
});
