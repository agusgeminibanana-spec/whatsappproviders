import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip, Smile, Check, CheckCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  fromMe: boolean;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

export default function ChatDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

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
        const response = await fetch(`/api/whatsapp/chats/${encodedId}/messages`);
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setMessages(data.data.map((m: any) => ({
                id: m.id,
                content: m.content,
                fromMe: m.fromMe,
                timestamp: m.timestamp,
                status: 'read' // Mock status for now
            })));
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
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

    const payload = { phone: contactId, message: messageInput };
    const tempMsg: Message = {
        id: Date.now().toString(),
        content: payload.message,
        fromMe: true,
        timestamp: new Date().toISOString(),
        status: 'sent'
    };

    setMessageInput("");
    setMessages((prev) => [...prev, tempMsg]);

    try {
      await fetch("/api/whatsapp/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Error sending:", error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("phone", contactId);
    formData.append("image", file);
    
    setMessages((prev) => [...prev, {
        id: Date.now().toString(),
        content: "📷 Sending image...",
        fromMe: true,
        timestamp: new Date().toISOString(),
        status: 'sent'
    }]);

    try {
      await fetch("/api/whatsapp/send-image", { method: "POST", body: formData });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error sending image:", error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-background relative">
      {/* Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-border/60 bg-card/80 backdrop-blur-md z-20 absolute top-0 w-full">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/chats")} className="sm:hidden -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10 ring-2 ring-background">
            <AvatarImage src="" /> {/* Todo: Add avatar */}
            <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white font-semibold">
              {contactName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm leading-none">{contactName}</h3>
            <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
                Online
            </span>
          </div>
        </div>
        <div className="flex gap-1 text-muted-foreground">
          <Button variant="ghost" size="icon" className="hover:text-foreground"><Phone className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="hover:text-foreground"><Video className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="hover:text-foreground"><MoreVertical className="h-5 w-5" /></Button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 pt-16 pb-20 bg-muted/5 overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <ScrollArea className="h-full px-4 py-4">
          <div className="space-y-6 max-w-3xl mx-auto">
            <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={cn(
                  "flex w-full",
                  message.fromMe ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                    "max-w-[80%] sm:max-w-[65%] relative group",
                    message.fromMe ? "items-end" : "items-start"
                )}>
                    <div className={cn(
                        "px-4 py-2.5 rounded-2xl text-sm shadow-sm relative z-10",
                        message.fromMe 
                            ? "bg-primary text-primary-foreground rounded-tr-sm" 
                            : "bg-card border border-border/50 rounded-tl-sm"
                    )}>
                        <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    
                    <div className={cn(
                        "flex items-center gap-1 mt-1 text-[10px] opacity-70 px-1",
                        message.fromMe ? "justify-end" : "justify-start"
                    )}>
                        <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {message.fromMe && (
                            <CheckCheck className="w-3 h-3" />
                        )}
                    </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 w-full bg-card/80 backdrop-blur-md border-t border-border p-3 z-20">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-end gap-2">
          <div className="flex gap-1 pb-1">
             <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Smile className="h-5 w-5" />
             </Button>
             <div className="relative">
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={() => fileInputRef.current?.click()}>
                    <Paperclip className="h-5 w-5" />
                </Button>
             </div>
          </div>

          <div className="flex-1 bg-muted/50 rounded-2xl border border-transparent focus-within:border-primary/30 focus-within:bg-background transition-all">
             <Input 
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="border-none bg-transparent focus-visible:ring-0 py-3 h-auto max-h-32"
             />
          </div>

          <Button 
            type="submit" 
            size="icon" 
            disabled={!messageInput.trim()}
            className={cn(
                "rounded-full w-10 h-10 mb-0.5 transition-all",
                messageInput.trim() 
                    ? "bg-primary hover:bg-primary/90 scale-100" 
                    : "bg-muted text-muted-foreground hover:bg-muted scale-90 opacity-50"
            )}
          >
            <Send className="h-5 w-5 ml-0.5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
