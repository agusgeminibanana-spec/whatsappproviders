
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // The onAuthStateChanged listener in AuthContext will handle the redirect.
    } catch (error) { 
      console.error("Error during Google sign-in:", error);
    } finally {
      setLoading(false);
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
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Sign In
            </h2>
            <p className="text-muted-foreground">
              Use your Google account to get started
            </p>
          </div>

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
            {loading ? "Signing in..." : "Sign in with Google"}
          </button>
          
          <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <p>By signing in, you agree to our Terms of Service</p>
          </div>
        </div>
      </div>
    </div>
  );
}
