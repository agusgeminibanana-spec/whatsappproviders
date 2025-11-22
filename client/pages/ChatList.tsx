import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, MessageCircle, LogOut, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/firebase";

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

const formatTimestamp = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const statusRes = await fetch("/api/whatsapp/status");
        const statusData = await statusRes.json();
        if (statusData.status !== "connected") {
          navigate("/qr");
          return;
        }

        const chatsRes = await fetch("/api/whatsapp/chats");
        if (chatsRes.ok) {
          const chatsData = (await chatsRes.json()).data || [];
          setChats(
            chatsData.map((c: any) => ({
              id: c.id,
              name: c.name || c.id.replace("@s.whatsapp.net", ""),
              avatar: c.avatar,
              lastMessage: c.lastMessage || "Sin mensajes aún",
              timestamp: c.lastMessageTimestamp,
              unread: c.unreadCount || 0,
            })),
          );
        }
      } catch (error) {
        console.error("Error loading chat data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  const filteredChats = chats.filter((chat) =>
    chat.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex w-full h-full bg-background overflow-hidden">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-full sm:w-[400px] flex flex-col border-r border-border bg-card/50 backdrop-blur-xl"
      >
        <div className="p-4 flex items-center justify-between border-b border-border/50">
          <h1 className="text-xl font-bold tracking-tight">Mensajes</h1>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Cerrar sesión"
            >
              <LogOut className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        <div className="px-4 py-3">
          <div className="relative group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar o iniciar un nuevo chat"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/50 border-transparent focus:bg-background"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 px-2">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">
              Cargando chats...
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <MessageCircle className="h-8 w-8 mb-2 opacity-20" />
              <p>No se encontraron chats</p>
            </div>
          ) : (
            <div className="space-y-1 py-2">
              <AnimatePresence>
                {filteredChats.map((chat) => (
                  <Link
                    key={chat.id}
                    to={`/chat/${encodeURIComponent(chat.id)}`}
                  >
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={cn(
                        "flex items-center gap-4 p-3 rounded-xl",
                        location.pathname.includes(encodeURIComponent(chat.id))
                          ? "bg-primary/10"
                          : "hover:bg-muted/50",
                      )}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback>
                          {chat.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h3
                            className={cn(
                              "font-semibold truncate",
                              location.pathname.includes(
                                encodeURIComponent(chat.id),
                              ) && "text-primary",
                            )}
                          >
                            {chat.name}
                          </h3>
                          <span className="text-[11px] text-muted-foreground font-medium">
                            {formatTimestamp(chat.timestamp)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                            {chat.lastMessage}
                          </p>
                          {chat.unread > 0 && (
                            <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>
      </motion.div>

      <div className="hidden sm:flex flex-1 flex-col items-center justify-center bg-muted/10 p-8 text-center">
        <h2 className="text-2xl font-bold">Selecciona un chat</h2>
        <p className="text-muted-foreground mt-2">
          Elige una conversación para empezar a chatear.
        </p>
      </div>
    </div>
  );
}
