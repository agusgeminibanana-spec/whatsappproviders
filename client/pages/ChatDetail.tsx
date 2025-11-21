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
} from "lucide-react";

interface Message {
  id: string;
  content: string; // Changed from 'text'
  fromMe: boolean;
  timestamp: string; // Changed from Timestamp
}

interface ChatContact {
  id: string;
  name: string;
}

const formatTimestamp = (isoString: string) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const getInitials = (name: string) => {
  if (!name) return "?";
  const words = name.split(" ");
  if (words.length > 1) return words[0][0] + words[1][0];
  return name.substring(0, 2);
};

export default function ChatDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageInput, setMessageInput] = useState("");
  const [contact, setContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Basic contact info from URL
    if (id) {
      const decodedId = decodeURIComponent(id);
      setContact({
        id: decodedId,
        name: decodedId.split("@")[0],
      });
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const decodedId = decodeURIComponent(id);

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `/api/whatsapp/chats/${encodeURIComponent(decodedId)}/messages`,
        );
        if (res.ok) {
          const data = (await res.json()).data || [];
          setMessages(data);
        }
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Poll for new messages
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !id) return;

    const text = messageInput;
    setMessageInput("");

    // Optimistic UI update
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: text,
        fromMe: true,
        timestamp: new Date().toISOString(),
      },
    ]);

    try {
      const response = await fetch("/api/whatsapp/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: id, message: text }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Revert optimistic update (optional)
    }
  };

  if (!contact) {
    return <div>Loading chat...</div>;
  }

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-background to-secondary/30">
      <div className="border-b border-border bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/chats")}
              className="p-2 hover:bg-secondary rounded-full transition-colors sm:hidden"
            >
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <div className="relative flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                {getInitials(contact.name)}
              </div>
            </div>
            <div className="min-w-0">
              <h2 className="font-semibold text-foreground">{contact.name}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Phone className="h-5 w-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Video className="h-5 w-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <MoreVertical className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.fromMe ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg rounded-2xl px-4 py-2 ${
                message.fromMe
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-card text-card-foreground border border-border rounded-bl-none"
              }`}
            >
              <p className="break-words text-sm">{message.content}</p>
              <div
                className={`mt-1 flex items-center justify-end gap-1 text-xs ${
                  message.fromMe
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                <span>{formatTimestamp(message.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border bg-background px-4 py-3">
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <button
            type="button"
            className="p-2 hover:bg-secondary rounded-full transition-colors flex-shrink-0"
          >
            <Smile className="h-5 w-5 text-foreground" />
          </button>
          <button
            type="button"
            className="p-2 hover:bg-secondary rounded-full transition-colors flex-shrink-0"
          >
            <Paperclip className="h-5 w-5 text-foreground" />
          </button>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-secondary px-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={!messageInput.trim()}
            className="p-2 hover:bg-primary/10 rounded-full transition-colors flex-shrink-0 disabled:opacity-50"
          >
            <Send className="h-5 w-5 text-primary" />
          </button>
        </form>
      </div>
    </div>
  );
}
