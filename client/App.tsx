
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

const queryClient = new QueryClient();

/**
 * A universal route guard that enforces the authentication flow.
 * @param user - The current Firebase user object.
 * @param isAllowed - The condition that must be true to allow access.
 * @param redirectPath - The path to redirect to if access is denied.
 * @param children - The child components to render if access is granted.
 */
const ProtectedRoute = ({ user, isAllowed, redirectPath, children }: { user: User | null; isAllowed: boolean; redirectPath: string; children?: React.ReactNode }) => {
  if (!user || !isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};

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
      {/* DEFAULT ROUTE: Handles initial redirection based on auth state */}
      <Route 
        path="/"
        element={!authGoogle ? <Login /> : <Navigate to={authWhatsapp ? "/chats" : "/whatsapp-qr"} replace />}
      />

      {/* LOGIN ROUTE: If user is fully authenticated, redirect them away from login */}
      <Route 
        path="/login"
        element={authGoogle && authWhatsapp ? <Navigate to="/chats" replace /> : <Login />}
      />

      {/* PROTECTED AREA: Requires at least Google Auth */}
      <Route element={<ProtectedRoute user={authGoogle} isAllowed={!!authGoogle} redirectPath="/login" />}>
        
        {/* QR Page: Accessible if Google Auth is present but WhatsApp is not. */}
        <Route 
          path="/whatsapp-qr"
          element={authWhatsapp ? <Navigate to="/chats" replace /> : <QRConnect />}
        />
        {/* Alias for QR page */}
        <Route path="/qr" element={<Navigate to="/whatsapp-qr" replace />} />

        {/* FULLY PROTECTED AREA: Requires both Google and WhatsApp Auth */}
        <Route element={<ProtectedRoute user={authGoogle} isAllowed={authWhatsapp} redirectPath="/whatsapp-qr" />}>
          <Route path="/chats" element={<AppLayout><Index /></AppLayout>} />
          <Route path="/chat/:id" element={<AppLayout><ChatDetail /></AppLayout>} />
          <Route path="/crm" element={<AppLayout><CRMDashboard /></AppLayout>} />
          <Route path="/crm/:id" element={<AppLayout><CustomerProfile /></AppLayout>} />
        </Route>
      </Route>

      {/* Catch-all for any undefined routes */}
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
