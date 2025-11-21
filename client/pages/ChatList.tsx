import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Plus, MessageSquare, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { auth } from "@/firebase";

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  jid?: string;
}

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // To detect active chat

  useEffect(() => {
    const loadData = async () => {
      try {
        const statusRes = await fetch("/api/whatsapp/status");
        const statusData = await statusRes.json();

        if (statusData.status !== "connected" || !statusData.user) {
          navigate("/qr");
          return;
        }

        const chatsRes = await fetch("/api/whatsapp/chats");
        if (chatsRes.ok) {
          const chatsData = await chatsRes.json();
          const mappedChats = (chatsData.data || []).map((c: any) => {
            const msgDate = c.lastMessageTimestamp
              ? new Date(c.lastMessageTimestamp)
              : new Date();
            // Format date nicely (e.g. "10:30 AM" or "Yesterday")
            const isToday = new Date().toDateString() === msgDate.toDateString();
            const timeStr = isToday 
                ? msgDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : msgDate.toLocaleDateString([], { month: 'short', day: 'numeric' });

            return {
              id: c.id,
              name: c.name || c.id.replace("@s.whatsapp.net", ""),
              avatar: c.avatar,
              lastMessage: c.lastMessage || "No messages yet",
              timestamp: timeStr,
              unread: c.unreadCount || 0,
              jid: c.id,
            };
          });
          setChats(mappedChats);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  const filteredChats = chats.filter(
    (chat) =>
      chat.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.id?.includes(searchQuery),
  );

  const handleLogout = async () => {
      await auth.signOut();
      localStorage.clear();
      navigate('/');
  };

  return (
    <div className="flex w-full h-full bg-background overflow-hidden">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-full sm:w-[400px] flex flex-col border-r border-border bg-card/50 backdrop-blur-xl relative z-10"
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-border/50">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                 <MessageSquare className="h-5 w-5" />
             </div>
             <h1 className="text-xl font-bold tracking-tight">Messages</h1>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                <LogOut className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/50 border-transparent focus:bg-background focus:border-primary/20 transition-all duration-200"
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1 px-2">
          {loading ? (
            <div className="flex flex-col gap-2 p-4">
               {[1, 2, 3].map((i) => (
                   <div key={i} className="h-16 w-full bg-muted/30 rounded-lg animate-pulse" />
               ))}
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <Search className="h-8 w-8 mb-2 opacity-20" />
              <p>No chats found</p>
            </div>
          ) : (
            <div className="space-y-1 py-2">
              <AnimatePresence>
              {filteredChats.map((chat) => {
                const isActive = location.pathname.includes(encodeURIComponent(chat.id));
                return (
                <Link key={chat.id} to={`/chat/${encodeURIComponent(chat.id)}`}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "flex items-center gap-4 p-3 rounded-xl transition-all duration-200 cursor-pointer group border border-transparent",
                        isActive 
                            ? "bg-primary/10 border-primary/10 shadow-sm" 
                            : "hover:bg-muted/50 hover:border-border/50"
                      )}
                    >
                      <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                        <AvatarImage src={chat.avatar} className="object-cover" />
                        <AvatarFallback className={cn(isActive ? "bg-primary text-primary-foreground" : "bg-muted")}>
                          {chat.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className={cn("font-semibold truncate", isActive ? "text-primary" : "text-foreground")}>
                              {chat.name}
                          </h3>
                          <span className="text-[11px] text-muted-foreground font-medium">
                              {chat.timestamp}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                            {chat.lastMessage}
                          </p>
                          {chat.unread > 0 && (
                            <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground animate-in zoom-in duration-300">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </motion.div>
                </Link>
              )})}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>
      </motion.div>

      {/* Empty State / Outlet Placeholder */}
      <div className="hidden sm:flex flex-1 flex-col items-center justify-center bg-muted/10 p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative z-10 flex flex-col items-center">
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="h-24 w-24 bg-gradient-to-br from-primary to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-primary/20"
            >
                <MessageSquare className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-3 tracking-tight">WhatsApp Web</h2>
            <p className="text-muted-foreground max-w-sm text-lg">
            Select a chat from the sidebar to start messaging securely.
            </p>
        </div>
      </div>
    </div>
  );
}
