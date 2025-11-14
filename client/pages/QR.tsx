
import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { MessageCircle, CheckCircle } from "lucide-react";
import QRCode from "qrcode";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function QRConnect() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [status, setStatus] = useState<'pending' | 'connected' | 'disconnected'>('pending');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Listen to the session document for status changes
    const unsub = onSnapshot(doc(db, "whatsapp_sessions", "fusion-app"), (doc) => {
      const data = doc.data();
      if (data) {
        setStatus(data.status || 'disconnected');
        setQrCode(data.qr || null);
      } else {
        // If the document doesn't exist, assume disconnected and waiting for a QR
        setStatus('disconnected');
        setQrCode(null);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    // Draw the QR code whenever the qrCode state updates
    if (qrCode && status === 'pending' && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qrCode, { width: 220, margin: 1 });
    }
  }, [qrCode, status]);

  // Redirect declaratively when status is 'connected'
  if (status === 'connected') {
    return <Navigate to="/chats" replace />;
  }

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-background via-background to-primary/10">
      {/* Left Side - Information */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-background/50 p-12">
         <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <MessageCircle className="h-10 w-10 text-primary-foreground" />
          </div>
        </div>
        <h1 className="mb-4 text-5xl font-bold text-foreground">WhatsApp</h1>
        <p className="text-center text-lg text-muted-foreground mb-12">
          Connect Your Device
        </p>

        <div className="space-y-6 max-w-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
              <span className="text-lg font-semibold text-primary">1</span>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">
                Open WhatsApp on Your Phone
              </p>
              <p className="text-sm text-muted-foreground">
                Make sure your phone is nearby and connected to the internet
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
              <span className="text-lg font-semibold text-primary">2</span>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">
                Scan the QR Code
              </p>
              <p className="text-sm text-muted-foreground">
                Go to Settings → Linked Devices → Link a Device and scan the QR
                code
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
              <span className="text-lg font-semibold text-primary">3</span>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">
                You're All Set
              </p>
              <p className="text-sm text-muted-foreground">
                Once scanned, you'll be connected and ready to message
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 p-4 rounded-lg bg-primary/10 border border-primary/20 max-w-sm">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground block mb-1">
              🔒 Keep Your QR Code Private
            </span>
            Never share your QR code with anyone. Anyone with your QR code can
            access your WhatsApp account.
          </p>
        </div>
      </div>

      {/* Right Side - QR Code */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="mb-8 flex lg:hidden flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <MessageCircle className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">WhatsApp</h1>
          </div>

          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Scan QR Code
            </h2>
            <p className="text-muted-foreground">
              Use your phone to scan this code to connect
            </p>
          </div>

          {/* QR Code Container */}
          <div className="mb-8 flex flex-col items-center">
             <div className="relative w-64 h-64 bg-white rounded-2xl shadow-2xl p-4 flex items-center justify-center">
                {qrCode && status === 'pending' ? (
                    <canvas ref={canvasRef} />
                ) : (
                    <div className="flex flex-col items-center">
                    {status === 'connected' ? (
                        <>
                            <CheckCircle className="h-20 w-20 text-primary mx-auto mb-4" />
                            <p className="text-lg font-bold text-primary">Connected!</p>
                        </>
                    ) : (
                        <>
                           <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-2" />
                           <p className="text-sm text-foreground font-medium">
                                Waiting for Server...
                           </p>
                        </>
                    )}
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
