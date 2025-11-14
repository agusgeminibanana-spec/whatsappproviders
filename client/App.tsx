
import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import QRConnect from "./pages/QRConnect";
import Index from "./pages/Index";
import ChatDetail from "./pages/ChatDetail";
import CRMDashboard from "./pages/CRMDashboard";
import CustomerProfile from "./pages/CustomerProfile";
import NotFound from "./pages/NotFound";
import ChatList from "./pages/ChatList";

const queryClient = new QueryClient();

/**
 * Main component to manage application routes and state based on the definitive prompt.
 */
function AppRoutes() {
  const [authGoogle, setAuthGoogle] = useState<User | null>(null);
  const [authWhatsapp, setAuthWhatsapp] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Stage 1: Google Auth State Listener.
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setAuthGoogle(currentUser);
      if (!currentUser) {
        // If Google Auth is lost, WhatsApp Auth is also considered lost.
        setAuthWhatsapp(false);
      }
      setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    // Stage 2: WhatsApp Auth State Listener (via Firestore).
    // This only runs if the user is authenticated with Google.
    if (authGoogle) {
      const sessionDocRef = doc(db, "qrcodes", "whatsapp-link");
      const unsubscribeDB = onSnapshot(sessionDocRef, (doc) => {
        // If the document does NOT exist, it means the session is active.
        setAuthWhatsapp(!doc.exists());
      });
      return () => unsubscribeDB();
    } else {
      // No Google user, so WhatsApp cannot be connected.
      setAuthWhatsapp(false);
    }
  }, [authGoogle]);

  if (loading) {
    // Display a blank page or minimal loader to avoid flashes of incorrect routes.
    return <div className="w-full h-screen bg-background" />;
  }

  return (
    <Routes>
      {/* 1. ROOT PATH */}
      {/* Acts as the main entry point and redirects based on authentication status. */}
      <Route
        path="/"
        element={
          <Navigate
            to={
              !authGoogle
                ? "/login"
                : !authWhatsapp
                ? "/qr-connect"
                : "/chats"
            }
            replace
          />
        }
      />

      {/* 2. LOGIN ROUTE */}
      {/* If the user is already authenticated, redirect them to the appropriate next step. */}
      <Route
        path="/login"
        element={
          authGoogle ? (
            <Navigate to={authWhatsapp ? "/chats" : "/qr-connect"} replace />
          ) : (
            <Login />
          )
        }
      />

      {/* 3. QR-CONNECT ROUTE */}
      {/* Requires Google auth. If not present, redirects to /login. */}
      {/* If WhatsApp is already connected, redirects to the main app. */}
      <Route
        path="/qr-connect"
        element={
          !authGoogle ? (
            <Navigate to="/login" replace />
          ) : authWhatsapp ? (
            <Navigate to="/chats" replace />
          ) : (
            <QRConnect />
          )
        }
      />

      {/* 4. FULLY PROTECTED ROUTES */}
      {/* These routes require both Google and WhatsApp authentication. */}
      <Route
        element={
          authGoogle && authWhatsapp ? (
            <Outlet />
          ) : (
            <Navigate to={!authGoogle ? "/login" : "/qr-connect"} replace />
          )
        }
      >
        <Route path="/chats" element={<AppLayout><ChatList /></AppLayout>} />
        <Route path="/chat/:id" element={<AppLayout><ChatDetail /></AppLayout>} />
        <Route path="/crm" element={<AppLayout><CRMDashboard /></AppLayout>} />
        <Route path="/crm/:id" element={<AppLayout><CustomerProfile /></AppLayout>} />
      </Route>

      {/* 5. CATCH-ALL ROUTE */}
      {/* Handles any undefined paths. */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
