import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, CheckCircle, Smartphone } from 'lucide-react';

export default function QRConnect() {
  const navigate = useNavigate();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulate QR code scanning
  const handleSimulateScanning = () => {
    setLoading(true);
    setTimeout(() => {
      setScanned(true);
      setTimeout(() => {
        localStorage.setItem('qrConnected', 'true');
        navigate('/chats');
      }, 1500);
    }, 2000);
  };

  useEffect(() => {
    // Auto-dismiss the hint after 5 seconds
    const timer = setTimeout(() => {
      // Could add analytics here
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

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
              <p className="font-semibold text-foreground mb-1">Open WhatsApp on Your Phone</p>
              <p className="text-sm text-muted-foreground">Make sure your phone is nearby and connected to the internet</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
              <span className="text-lg font-semibold text-primary">2</span>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Scan the QR Code</p>
              <p className="text-sm text-muted-foreground">Go to Settings → Linked Devices → Link a Device and scan the QR code</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
              <span className="text-lg font-semibold text-primary">3</span>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">You're All Set</p>
              <p className="text-sm text-muted-foreground">Once scanned, you'll be connected and ready to message</p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-12 p-4 rounded-lg bg-primary/10 border border-primary/20 max-w-sm">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground block mb-1">🔒 Keep Your QR Code Private</span>
            Never share your QR code with anyone. Anyone with your QR code can access your WhatsApp account.
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
            <h2 className="mb-2 text-2xl font-bold text-foreground">Scan QR Code</h2>
            <p className="text-muted-foreground">Use your phone to scan this code to connect</p>
          </div>

          {/* QR Code Container */}
          <div className="mb-8 flex flex-col items-center">
            {!scanned ? (
              <div className="relative">
                {/* QR Code Background */}
                <div className="w-64 h-64 bg-white rounded-2xl shadow-2xl p-4 flex items-center justify-center">
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl backdrop-blur-sm">
                      <div className="flex flex-col items-center">
                        <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-2" />
                        <p className="text-sm text-foreground font-medium">Connecting...</p>
                      </div>
                    </div>
                  )}
                  {/* Simulated QR Code Pattern */}
                  <svg
                    width="220"
                    height="220"
                    viewBox="0 0 220 220"
                    fill="none"
                    className="text-gray-900"
                  >
                    {/* QR Code Pattern */}
                    <rect width="220" height="220" fill="white" />
                    {/* Finder patterns */}
                    <rect x="10" y="10" width="50" height="50" fill="black" />
                    <rect x="14" y="14" width="42" height="42" fill="white" />
                    <rect x="18" y="18" width="34" height="34" fill="black" />

                    <rect x="160" y="10" width="50" height="50" fill="black" />
                    <rect x="164" y="14" width="42" height="42" fill="white" />
                    <rect x="168" y="18" width="34" height="34" fill="black" />

                    <rect x="10" y="160" width="50" height="50" fill="black" />
                    <rect x="14" y="164" width="42" height="42" fill="white" />
                    <rect x="18" y="168" width="34" height="34" fill="black" />

                    {/* Timing patterns */}
                    <line x1="60" y1="6" x2="160" y2="6" stroke="black" strokeWidth="6" />
                    <line x1="6" y1="60" x2="6" y2="160" stroke="black" strokeWidth="6" />

                    {/* Data pattern (random-like) */}
                    <rect x="70" y="70" width="80" height="80" fill="black" opacity="0.5" />
                    <circle cx="110" cy="110" r="8" fill="black" />
                  </svg>
                </div>

                {/* Scanning Indicator */}
                {loading && (
                  <div className="absolute inset-0 w-64 h-64 rounded-2xl border-2 border-primary animate-pulse" />
                )}
              </div>
            ) : (
              <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl shadow-2xl flex items-center justify-center border border-primary/30">
                <div className="text-center">
                  <CheckCircle className="h-20 w-20 text-primary mx-auto mb-4 animate-bounce" />
                  <p className="text-lg font-bold text-primary">Connected!</p>
                  <p className="text-sm text-muted-foreground mt-2">Redirecting...</p>
                </div>
              </div>
            )}
          </div>

          {/* Scan Button */}
          {!scanned && (
            <button
              onClick={handleSimulateScanning}
              disabled={loading}
              className="w-full mb-4 rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Scanning...' : 'Simulate Scanning QR Code'}
            </button>
          )}

          {/* Alternative Method */}
          {!scanned && (
            <>
              <div className="relative mb-4 flex items-center gap-4">
                <div className="flex-1 border-t border-border" />
                <span className="text-xs text-muted-foreground">OR</span>
                <div className="flex-1 border-t border-border" />
              </div>

              <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 font-medium text-foreground transition-colors hover:bg-secondary mb-6">
                <Smartphone className="h-5 w-5" />
                Use Phone Number Instead
              </button>
            </>
          )}

          {/* Footer Info */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Make sure your phone has WhatsApp installed and is connected to the internet
            </p>
          </div>

          {/* Help Link */}
          <div className="mt-8 border-t border-border pt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Need help?{' '}
              <button className="font-medium text-primary hover:underline">
                View troubleshooting guide
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
