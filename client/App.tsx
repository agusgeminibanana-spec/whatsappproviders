
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
import QR from "./pages/QR";
import Index from "./pages/Index";
import ChatDetail from "./pages/ChatDetail";
import CRMDashboard from "./pages/CRMDashboard";
import CustomerProfile from "./pages/CustomerProfile";
import NotFound from "./pages/NotFound";
import ChatList from "./pages/ChatList";

const queryClient = new QueryClient();

function AppRoutes() {
  const [authGoogle, setAuthGoogle] = useState<User | null>(null);
  const [authWhatsapp, setAuthWhatsapp] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setAuthGoogle(currentUser);
      if (!currentUser) {
        setAuthWhatsapp(false);
      }
      setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (authGoogle) {
      const sessionDocRef = doc(db, "whatsapp_sessions", "fusion-app");
      const unsubscribeDB = onSnapshot(sessionDocRef, (doc) => {
        setAuthWhatsapp(doc.exists() && doc.data().status === 'connected');
      });
      return () => unsubscribeDB();
    } else {
      setAuthWhatsapp(false);
    }
  }, [authGoogle]);

  if (loading) {
    return <div className="w-full h-screen bg-background" />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={
              !authGoogle
                ? "/login"
                : !authWhatsapp
                ? "/qr"
                : "/chats"
            }
            replace
          />
        }
      />

      <Route
        path="/login"
        element={
          authGoogle ? (
            <Navigate to={authWhatsapp ? "/chats" : "/qr"} replace />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/qr"
        element={
          !authGoogle ? (
            <Navigate to="/login" replace />
          ) : authWhatsapp ? (
            <Navigate to="/chats" replace />
          ) : (
            <QR />
          )
        }
      />

      <Route
        element={
          authGoogle && authWhatsapp ? (
            <Outlet />
          ) : (
            <Navigate to={!authGoogle ? "/login" : "/qr"} replace />
          )
        }
      >
        <Route path="/chats" element={<AppLayout><ChatList /></AppLayout>} />
        <Route path="/chat/:id" element={<AppLayout><ChatDetail /></AppLayout>} />
        <Route path="/crm" element={<AppLayout><CRMDashboard /></AppLayout>} />
        <Route path="/crm/:id" element={<AppLayout><CustomerProfile /></AppLayout>} />
      </Route>

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
