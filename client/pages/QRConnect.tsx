import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  CheckCircle,
  Smartphone,
  RefreshCw,
} from "lucide-react";

export default function QRConnect() {
  const navigate = useNavigate();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>("disconnected");
  const [pollCount, setPollCount] = useState(0);

  const checkStatus = async () => {
    try {
      const response = await fetch("/api/whatsapp/status");
      if (response.ok) {
        const data = await response.json();
        console.log("Status polling:", data);

        if (data.status === "connected" || data.user) {
          console.log("Conectado! Redirigiendo...");
          setConnectionStatus("connected");
          setQrCode(null);
          setScanned(true);
          localStorage.setItem("qrConnected", "true");
          navigate("/chats");
          return true;
        }

        if (data.qr && data.status !== "connected") {
          setQrCode(data.qr);
        }
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    }
    return false;
  };

  useEffect(() => {
    let isMounted = true;
    checkStatus();
    const interval = setInterval(async () => {
      if (isMounted) {
        const connected = await checkStatus();
        if (!connected) setPollCount((prev) => prev + 1);
      }
    }, 3000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [navigate]);

  const handleManualCheck = async () => {
    setLoading(true);
    await checkStatus();
    setTimeout(async () => {
      await checkStatus();
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-background via-background to-primary/10">
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-background/50 p-12">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <MessageCircle className="h-10 w-10 text-primary-foreground" />
          </div>
        </div>
        <h1 className="mb-4 text-5xl font-bold text-foreground">WhatsApp</h1>
        <p className="text-center text-lg text-muted-foreground mb-12">
          Conecta tu dispositivo
        </p>
        <div className="space-y-6 max-w-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
              <span className="text-lg font-semibold text-primary">1</span>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">
                Abre WhatsApp en tu teléfono
              </p>
              <p className="text-sm text-muted-foreground">
                Ve a Ajustes {">"} Dispositivos vinculados {">"} Vincular un dispositivo
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
              <span className="text-lg font-semibold text-primary">2</span>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">
                Escanea el código QR
              </p>
              <p className="text-sm text-muted-foreground">
                Apunta tu cámara a la pantalla
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Escanea el Código QR
            </h2>
            <p className="text-muted-foreground">
              Usa tu teléfono para escanear este código y conectar
            </p>
          </div>
          <div className="mb-8 flex flex-col items-center">
            {scanned || connectionStatus === "connected" ? (
              <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl shadow-2xl flex items-center justify-center border border-primary/30">
                <div className="text-center">
                  <CheckCircle className="h-20 w-20 text-primary mx-auto mb-4 animate-bounce" />
                  <p className="text-lg font-bold text-primary">¡Conectado!</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Redirigiendo...
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="w-64 h-64 bg-white rounded-2xl shadow-2xl p-4 flex items-center justify-center overflow-hidden">
                  {qrCode ? (
                    <img
                      src={qrCode}
                      alt="WhatsApp QR Code"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full w-full">
                      <div className="h-8 w-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-2" />
                      <p className="text-xs text-muted-foreground">
                        {pollCount > 3 ? "Generando QR..." : "Cargando..."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {!scanned && connectionStatus !== "connected" && (
            <div className="w-full mb-4 text-center space-y-3">
              <button
                onClick={handleManualCheck}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 font-medium text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
              >
                {loading ? (
                  "Verificando..."
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Ya lo escaneé, continuar
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
