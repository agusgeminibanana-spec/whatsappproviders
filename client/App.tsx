import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import QRConnect from "./pages/QRConnect";
import Index from "./pages/Index";
import ChatDetail from "./pages/ChatDetail";
import CRMDashboard from "./pages/CRMDashboard";
import CustomerProfile from "./pages/CustomerProfile";
import NotFound from "./pages/NotFound";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

const queryClient = new QueryClient();

const QRRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  
  return user ? children : <Navigate to="/" />;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // We remove the 'qrConnected' local storage check here because:
  // 1. It's unreliable (localStorage persists even if session invalid)
  // 2. The component itself (ChatList) now verifies the connection with the backend
  // 3. If connection is invalid, ChatList will redirect to /qr
  
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return user ? <AppLayout>{children}</AppLayout> : <Navigate to="/" />;
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/qr" element={<QRRoute><QRConnect /></QRRoute>} />
            <Route path="/chats" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/chat/:id" element={<ProtectedRoute><ChatDetail /></ProtectedRoute>} />
            <Route path="/crm" element={<ProtectedRoute><CRMDashboard /></ProtectedRoute>} />
            <Route path="/crm/:id" element={<ProtectedRoute><CustomerProfile /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
