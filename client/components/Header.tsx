
import {
  MoreVertical,
  Camera,
  MessageCircle,
  Search,
  LogOut,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGoogleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out from Google:", error);
    }
  };

  const handleWhatsAppLogout = async () => {
    try {
      await deleteDoc(doc(db, "qrcodes", "whatsapp-link"));
      navigate("/qr-connect");
    } catch (error) {
      console.error("Error disconnecting from WhatsApp:", error);
    }
  };

  const isChatsRoute =
    location.pathname.startsWith("/chat") || location.pathname === "/chats";
  const isCRMRoute = location.pathname.startsWith("/crm");

  return (
    <header className="border-b border-border bg-background">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <MessageCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">WhatsApp</h1>
          </div>

          <div className="flex items-center gap-2 relative">
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Camera className="h-5 w-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Search className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <MoreVertical className="h-5 w-5 text-foreground" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 w-56 rounded-lg border border-border bg-card shadow-lg z-50 py-1">
                <button
                  onClick={handleGoogleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout from Google
                </button>
                <button
                  onClick={handleWhatsAppLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Disconnect WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 border-t border-border pt-3">
          <button
            onClick={() => navigate("/chats")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              isChatsRoute
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageCircle className="h-4 w-4" />
            Messages
          </button>
          <button
            onClick={() => navigate("/crm")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              isCRMRoute
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            CRM
          </button>
        </div>
      </div>
    </header>
  );
}
