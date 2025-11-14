
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

// Helper function to call the backend logout
const triggerBackendWhatsAppLogout = async () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!apiBaseUrl) {
    console.error("VITE_API_BASE_URL is not defined. Cannot call backend logout.");
    // Even if backend call fails, we proceed with frontend cleanup.
    return;
  }
  try {
    await fetch(`${apiBaseUrl}/whatsapp/logout`, { method: "POST" });
  } catch (error) {
    console.error("Error calling backend WhatsApp logout:", error);
  }
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * Handles the complete global logout as per the prompt.
   * Logs out from Google, which in turn triggers a full session cleanup.
   */
  const handleGoogleLogout = async () => {
    try {
      // 1. Trigger backend WhatsApp session destruction
      await triggerBackendWhatsAppLogout();
      
      // 2. Explicitly delete the Firestore session document to ensure state is cleared.
      await deleteDoc(doc(db, "whatsapp_sessions", "fusion-app"));

      // 3. Sign out from Firebase Auth. The listener in App.tsx will handle the rest.
      await signOut(auth);
      
      // 4. Clear all local data as a final measure.
      localStorage.clear();
      sessionStorage.clear();

    } catch (error) {
      console.error("Error during Google logout:", error);
    }
  };

  /**
   * Handles only the WhatsApp session logout, forcing a new QR code.
   */
  const handleWhatsAppLogout = async () => {
    try {
      // 1. Send request to backend to destroy Baileys session
      await triggerBackendWhatsAppLogout();

      // 2. Delete the session document from Firestore. 
      // This is the primary signal for the frontend to update its state.
      // The onSnapshot listener in App.tsx will detect this and set isWhatsAppConnected to false.
      await deleteDoc(doc(db, "whatsapp_sessions", "fusion-app"));
      
      // Note: No local data clearing here, as the Google session remains.
      // The redirect to /whatsapp-qr is handled automatically by App.tsx.

    } catch (error) {
      console.error("Error disconnecting from WhatsApp:", error);
    }
  };

  const isChatsRoute = location.pathname.startsWith("/chat") || location.pathname === "/chats";
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
            {/* Action Buttons */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <MoreVertical className="h-5 w-5 text-foreground" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 w-56 rounded-lg border border-border bg-card shadow-lg z-50 py-1">
                <button
                  onClick={handleWhatsAppLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión de WhatsApp
                </button>
                <div className="my-1 h-px bg-border" />
                <button
                  onClick={handleGoogleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión Global
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
