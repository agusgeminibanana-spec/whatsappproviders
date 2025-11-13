
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

const AuthManager = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        // Only listen to DB when user is logged in
        const unsubscribeDB = onSnapshot(doc(db, "qrcodes", "whatsapp-link"), (doc) => {
          setIsWhatsAppConnected(!doc.exists());
        });
        return () => unsubscribeDB();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={isWhatsAppConnected ? "/chats" : "/qr-connect"} /> : <Login />} />
      
      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/qr-connect" element={isWhatsAppConnected ? <Navigate to="/chats" /> : <QRConnect />} />
        <Route path="/qr" element={<Navigate to="/qr-connect" />} />
        
        <Route element={<WhatsAppConnectedRoute user={user} isWhatsAppConnected={isWhatsAppConnected} />}>
            <Route path="/chats" element={<AppLayout><Index /></AppLayout>} />
            <Route path="/chat/:id" element={<AppLayout><ChatDetail /></AppLayout>} />
            <Route path="/crm" element={<AppLayout><CRMDashboard /></AppLayout>} />
            <Route path="/crm/:id" element={<AppLayout><CustomerProfile /></AppLayout>} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const ProtectedRoute = ({ user }: { user: User | null }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

const WhatsAppConnectedRoute = ({ user, isWhatsAppConnected }: { user: User | null, isWhatsAppConnected: boolean }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  if (!isWhatsAppConnected) {
    return <Navigate to="/qr-connect" />;
  }
  return <Outlet />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <AuthManager />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
