import { Router } from "express";
import { initWhatsApp, getSocket, getQrCode } from "../whatsapp/connection";

export const whatsappRouter = Router();

whatsappRouter.get("/status", async (req, res) => {
    const sock = getSocket();
    const qr = getQrCode();
    
    if (sock && sock.user) {
        res.json({ status: "connected", user: sock.user });
    } else {
        res.json({ status: "disconnected", qr: qr });
    }
});

whatsappRouter.post("/send-message", async (req, res) => {
    const { phone, message } = req.body;
    const sock = await initWhatsApp();
    
    try {
        // Ensure phone is in correct format (e.g., 1234567890@s.whatsapp.net)
        const id = phone.includes('@s.whatsapp.net') ? phone : `${phone}@s.whatsapp.net`;
        await sock.sendMessage(id, { text: message });
        res.json({ success: true, message: "Message sent" });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Failed to send message" });
    }
});

// Initialize WhatsApp connection on server start
initWhatsApp();
