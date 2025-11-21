import { Router } from "express";
import { initWhatsApp, getSocket, getChats, waitForSocketOpen } from "../whatsapp/connection";
import { db } from '../init-firebase';
import multer from 'multer';

export const whatsappRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

// --- Middlewares & Helpers ---

const normalizeJid = (phone: string): string => {
    let id = phone;
    if (!id.includes('@')) {
        const cleanPhone = phone.replace(/\D/g, '');
        id = `${cleanPhone}@s.whatsapp.net`;
    } else if (phone.includes('@s.whatsapp.net')) {
        const [num, suffix] = phone.split('@');
        const cleanNum = num.replace(/\D/g, '');
        id = `${cleanNum}@${suffix}`;
    }
    return id;
};

const ensureConnected = async (res: any): Promise<any> => {
    try {
        await initWhatsApp();
        const connected = await waitForSocketOpen();
        const sock = getSocket();

        if (!connected || !sock) {
             console.error("Socket failed to open in time");
             res.status(503).json({ error: "WhatsApp connecting... please retry." });
             return null;
        }
        return sock;
    } catch (e: any) {
        console.error("Connection error:", e);
        res.status(500).json({ error: "Connection failed: " + e.message });
        return null;
    }
};

// --- Routes ---

whatsappRouter.get("/status", async (req, res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    
    try {
        initWhatsApp().catch(e => console.error("Async init error", e));
    } catch (e) {
        console.error("Sync init error", e);
    }

    try {
        const doc = await db.collection('whatsapp_status').doc('session').get();
        const data = doc.data();

        let finalStatus = data?.status || 'disconnected';
        let qr = data?.qr || null;
        let user = data?.user || null;

        const sock = getSocket();
        if (sock?.ws?.isOpen) {
            finalStatus = 'connected';
            if (sock.user) user = sock.user;
        }

        res.json({ status: finalStatus, qr: qr, user: user });

    } catch (error) {
        console.error("Error reading status from DB:", error);
        res.status(500).json({ error: "Failed to fetch status" });
    }
});

whatsappRouter.get("/chats", async (req, res) => {
    res.set('Cache-Control', 'no-store');
    try {
        await initWhatsApp();
        const chats = await getChats();
        res.json({ success: true, data: chats });
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({ error: "Failed to fetch chats" });
    }
});

whatsappRouter.get("/chats/:id/messages", async (req, res) => {
    res.set('Cache-Control', 'no-store');
    const { id } = req.params;
    const decodedId = decodeURIComponent(id);

    try {
        const snapshot = await db.collection('whatsapp_chats')
            .doc(decodedId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .limit(50)
            .get();

        const messages = snapshot.docs.map(doc => {
            const d = doc.data();
            if (d.timestamp?.toDate) d.timestamp = d.timestamp.toDate().toISOString();
            return d;
        });

        res.json({ success: true, data: messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

// --- Action Routes ---

whatsappRouter.post("/send-message", async (req, res) => {
    const { phone, message } = req.body; // Removed quotedMessageId unused
    const sock = await ensureConnected(res);
    if (!sock) return;

    try {
        const id = normalizeJid(phone);
        console.log(`Sending text to ${id}`);
        
        await sock.sendMessage(id, { text: message });
        res.json({ success: true, message: "Message sent" });
    } catch (error: any) {
        res.status(500).json({ error: "Failed to send: " + (error.message || "Unknown") });
    }
});

whatsappRouter.post("/send-image", upload.single('image'), async (req, res) => {
    const { phone, caption } = req.body;
    const file = req.file;

    if (!file) {
        res.status(400).json({ error: "No image file provided" });
        return;
    }

    const sock = await ensureConnected(res);
    if (!sock) return;

    try {
        const id = normalizeJid(phone);
        console.log(`Sending image to ${id}`);

        await sock.sendMessage(id, {
            image: file.buffer,
            caption: caption,
            mimetype: file.mimetype
        });
        
        res.json({ success: true, message: "Image sent" });
    } catch (error: any) {
        console.error("Error sending image:", error);
        res.status(500).json({ error: "Failed to send image: " + error.message });
    }
});

whatsappRouter.post("/send-mention", async (req, res) => {
    const { phone, message, mentions } = req.body; // mentions is array of phones
    const sock = await ensureConnected(res);
    if (!sock) return;

    try {
        const id = normalizeJid(phone);
        const mentionJids = (mentions || []).map((m: string) => normalizeJid(m));

        await sock.sendMessage(id, {
            text: message,
            mentions: mentionJids
        });
        res.json({ success: true, message: "Mention sent" });
    } catch (error: any) {
        res.status(500).json({ error: "Failed to send mention: " + error.message });
    }
});

whatsappRouter.post("/create-group", async (req, res) => {
    const { name, members } = req.body; // members array of phones
    const sock = await ensureConnected(res);
    if (!sock) return;

    try {
        const memberJids = (members || []).map((m: string) => normalizeJid(m));
        const group = await sock.groupCreate(name, memberJids);
        res.json({ success: true, data: group });
    } catch (error: any) {
        res.status(500).json({ error: "Failed to create group: " + error.message });
    }
});

whatsappRouter.post("/update-group-subject", async (req, res) => {
    const { groupId, subject } = req.body;
    const sock = await ensureConnected(res);
    if (!sock) return;

    try {
        await sock.groupUpdateSubject(groupId, subject);
        res.json({ success: true, message: "Subject updated" });
    } catch (error: any) {
        res.status(500).json({ error: "Failed to update subject: " + error.message });
    }
});

whatsappRouter.post("/block-contact", async (req, res) => {
    const { phone, action } = req.body; // action: 'block' | 'unblock'
    const sock = await ensureConnected(res);
    if (!sock) return;

    try {
        const id = normalizeJid(phone);
        await sock.updateBlockStatus(id, action);
        res.json({ success: true, message: `Contact ${action}ed` });
    } catch (error: any) {
        res.status(500).json({ error: "Failed to update block status: " + error.message });
    }
});

whatsappRouter.post("/archive-chat", async (req, res) => {
    const { phone, archive } = req.body; // archive: boolean
    const sock = await ensureConnected(res);
    if (!sock) return;

    try {
        const id = normalizeJid(phone);
        // Removed unused lastTimestamp variable
        
        await sock.chatModify({
            archive: archive,
            lastMessages: [{ key: { remoteJid: id, id: 'DUMMY', fromMe: true }, messageTimestamp: Date.now()/1000 }] 
        }, id);
        
        res.json({ success: true, message: `Chat ${archive ? 'archived' : 'unarchived'}` });
    } catch (error: any) {
        res.status(500).json({ error: "Failed to archive: " + error.message });
    }
});

whatsappRouter.post("/delete-message", async (req, res) => {
    const { phone, messageId, fromMe } = req.body;
    const sock = await ensureConnected(res);
    if (!sock) return;

    try {
        const id = normalizeJid(phone);
        const key = {
            remoteJid: id,
            fromMe: fromMe ?? true, // Default to deleting own message
            id: messageId
        };
        
        await sock.sendMessage(id, { delete: key });
        res.json({ success: true, message: "Message deleted" });
    } catch (error: any) {
        res.status(500).json({ error: "Failed to delete: " + error.message });
    }
});
