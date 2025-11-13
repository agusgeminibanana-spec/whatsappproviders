
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config({ path: ".env.local" });
import { handleDemo } from "./routes/demo";
import { handleQrCode, handleLogout } from "./routes/whatsapp";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  
  // WhatsApp routes
  app.get("/api/whatsapp/qr", handleQrCode);
  app.post("/api/whatsapp/logout", handleLogout);

  return app;
}
