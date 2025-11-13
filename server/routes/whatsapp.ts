import { RequestHandler } from "express";
import { getQrCode, isConnected } from "../whatsapp/connection.cjs";

export const handleQrCode: RequestHandler = (req, res) => {
  const qr = getQrCode();
  const connected = isConnected();
  if (qr) {
    res.json({ qr, connected });
  } else {
    res.json({ connected });
  }
};
