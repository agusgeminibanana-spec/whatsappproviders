import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Mail, Lock } from 'lucide-react';
import { auth, googleProvider } from '@/firebase';
import { signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/chats'); // Direct to chats, let ChatList handle connection check
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      // Switch to Popup for better stability in this environment
      await signInWithPopup(auth, googleProvider);
      // onAuthStateChanged will handle redirect
    } catch (err: any) {
      console.error("Google login error:", err);
      setError("Failed to sign in with Google: " + err.message);
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      setError(null);
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err: any) {
        console.error("Email login error:", err);
        setError("Failed to sign in: " + err.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-background via-background to-primary/10">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-background/50 p-12">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <MessageCircle className="h-10 w-10 text-primary-foreground" />
          </div>
        </div>
        <h1 className="mb-4 text-5xl font-bold text-foreground">WhatsApp</h1>
        <p className="text-center text-lg text-muted-foreground">
          Simple. Reliable. Messaging
        </p>
        <div className="mt-12 space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <MessageCircle className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Instant Messaging</p>
              <p className="text-sm text-muted-foreground">Send messages instantly</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <MessageCircle className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">End-to-End Encrypted</p>
              <p className="text-sm text-muted-foreground">Your messages are private</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <MessageCircle className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Free and Available</p>
              <p className="text-sm text-muted-foreground">No charges for messaging</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 flex lg:hidden flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <MessageCircle className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">WhatsApp</h1>
          </div>

          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mb-6 w-full flex items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-3 font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>

          {/* Divider */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary px-4 py-2 pl-10 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary px-4 py-2 pl-10 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!email || !password || loading}
              className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              onClick={() => {
                 // navigate('/signup'); 
                 // For now, just let them login, same UI
              }}
              className="font-medium text-primary hover:underline"
            >
              Create one
            </button>
          </p>

          {/* Footer */}
          <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <p>By signing in, you agree to our Terms of Service</p>
          </div>
        </div>
      </div>
    </div>
  );
}
