import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { whatsappService } from "@/services/whatsapp";

interface Message {
  id: string;
  content: string;
  fromMe: boolean;
  timestamp: string;
}

const formatTimestamp = (isoString: string) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ChatDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const contactId = id ? decodeURIComponent(id) : "unknown";
  const contactName = contactId.split("@")[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!id) return;
    const fetchMessages = async () => {
      try {
        const encodedId = encodeURIComponent(contactId);
        const response = await fetch(
          `/api/whatsapp/chats/${encodedId}/messages`,
        );
        if (response.ok) {
          setMessages((await response.json()).data || []);
        }
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [contactId, id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    const text = messageInput;
    setMessageInput("");
    setSuggestions([]);
    try {
      await whatsappService.sendMessage({ phone: contactId, message: text });
    } catch (error: any) {
      console.error("Error enviando mensaje:", error);
    }
  };

  const handleGetSuggestions = async () => {
    setIsSuggesting(true);
    setSuggestions([]);
    try {
      const res = await fetch("/api/whatsapp/suggest-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      if (res.ok) {
        setSuggestions((await res.json()).suggestions || []);
      }
    } catch (error) {
      console.error("Error obteniendo sugerencias:", error);
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessageInput(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="flex h-full w-full flex-col bg-background">
      <div className="border-b border-border bg-card px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/chats")}
            className="sm:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarFallback>
              {contactName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{contactName}</h3>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 bg-muted/10">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.fromMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                    message.fromMe
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-card border rounded-bl-none"
                  }`}
                >
                  <p className="text-sm break-words">{message.content}</p>
                  <div
                    className={`text-[10px] mt-1 text-right ${
                      message.fromMe
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 bg-card border-t">
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-2 flex gap-2 overflow-x-auto pb-2"
            >
              {suggestions.map((s, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleSuggestionClick(s)}
                  className="px-3 py-1.5 bg-muted rounded-full text-sm"
                >
                  {s}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <Button variant="ghost" size="icon" type="button">
            <Smile className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" type="button">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          <div className="relative flex-1">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="pr-10"
            />
            <Button
              size="icon"
              variant="ghost"
              type="button"
              onClick={handleGetSuggestions}
              disabled={isSuggesting}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              {isSuggesting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2"></div>
              ) : (
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          <Button type="submit" size="icon" disabled={!messageInput.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
