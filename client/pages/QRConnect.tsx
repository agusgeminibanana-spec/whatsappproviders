import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, CheckCircle, Smartphone, RefreshCw } from 'lucide-react';

export default function QRConnect() {
  const navigate = useNavigate();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('disconnected');
  const [pollCount, setPollCount] = useState(0);

  const checkStatus = async () => {
      try {
        const response = await fetch('/api/whatsapp/status');
        if (response.ok) {
            const data = await response.json();
            console.log('Status polling:', data);
            
            if (data.status === 'connected') {
                console.log('Connected detected! Redirecting...');
                setConnectionStatus('connected');
                setQrCode(null); 
                setScanned(true);
                localStorage.setItem('qrConnected', 'true');
                navigate('/chats');
                return true;
            }

            if (data.qr && data.status !== 'connected') {
                setQrCode(data.qr);
            }
        }
      } catch (error) {
        console.error('Error fetching status:', error);
      }
      return false;
  };

  // Polling effect
  useEffect(() => {
    let isMounted = true;
    
    // Initial check
    checkStatus();

    // Poll every 3 seconds
    const interval = setInterval(async () => {
        if (isMounted) {
            const connected = await checkStatus();
            if (!connected) setPollCount(prev => prev + 1);
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
      // Wait a bit and check again
      setTimeout(async () => {
          await checkStatus();
          setLoading(false);
      }, 2000);
  };

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
          {/* Instructions */}
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
              <span className="text-lg font-semibold text-primary">1</span>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Open WhatsApp on Your Phone</p>
              <p className="text-sm text-muted-foreground">Settings {'>'} Linked Devices {'>'} Link a Device</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
              <span className="text-lg font-semibold text-primary">2</span>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Scan the QR Code</p>
              <p className="text-sm text-muted-foreground">Point your camera at the screen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - QR Code */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Scan QR Code</h2>
            <p className="text-muted-foreground">Use your phone to scan this code to connect</p>
          </div>

          {/* QR Code Container */}
          <div className="mb-8 flex flex-col items-center">
            {(scanned || connectionStatus === 'connected') ? (
              <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl shadow-2xl flex items-center justify-center border border-primary/30">
                <div className="text-center">
                  <CheckCircle className="h-20 w-20 text-primary mx-auto mb-4 animate-bounce" />
                  <p className="text-lg font-bold text-primary">Connected!</p>
                  <p className="text-sm text-muted-foreground mt-2">Redirecting...</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="w-64 h-64 bg-white rounded-2xl shadow-2xl p-4 flex items-center justify-center overflow-hidden">
                  {qrCode ? (
                       <img src={qrCode} alt="WhatsApp QR Code" className="w-full h-full object-contain" />
                  ) : (
                      <div className="flex flex-col items-center justify-center h-full w-full">
                           <div className="h-8 w-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-2" />
                           <p className="text-xs text-muted-foreground">
                               {pollCount > 3 ? "Generating QR..." : "Loading..."}
                           </p>
                      </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Manual Check Button */}
          {!scanned && connectionStatus !== 'connected' && (
             <div className="w-full mb-4 text-center space-y-3">
                <button
                onClick={handleManualCheck}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 font-medium text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
                >
                {loading ? 'Checking...' : (
                    <>
                        <RefreshCw className="h-4 w-4" />
                        I've Scanned It, Continue
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
