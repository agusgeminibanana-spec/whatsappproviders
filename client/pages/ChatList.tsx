import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, MessageCircle } from "lucide-react";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string; // Changed from Timestamp to string to match API
  unreadCount: number;
}

const formatTimestamp = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
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

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const statusRes = await fetch("/api/whatsapp/status");
        if (!statusRes.ok || (await statusRes.json()).status !== "connected") {
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
              lastMessage: c.lastMessage || "",
              timestamp: c.lastMessageTimestamp,
              unreadCount: c.unreadCount || 0,
            })),
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    const interval = setInterval(loadData, 5000); // Poll for updates
    return () => clearInterval(interval);
  }, [navigate]);

  const filteredChats = chats.filter(
    (chat) =>
      chat.name && chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex w-full h-full bg-background">
      <div className="w-full sm:w-96 flex flex-col border-r border-border bg-background">
        <div className="border-b border-border p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search or start new chat"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-secondary px-4 py-2 pl-10 text-sm"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <p>Loading chats...</p>
          </div>
        ) : filteredChats.length > 0 ? (
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <Link
                key={chat.id}
                to={`/chat/${encodeURIComponent(chat.id)}`}
                className="flex items-start gap-3 border-b border-border px-4 py-3 hover:bg-secondary"
              >
                <div className="relative mt-1 flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {getInitials(chat.name)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold truncate">{chat.name}</h3>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {formatTimestamp(chat.timestamp)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="ml-2 flex-shrink-0 self-center">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs">
                      {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-4">
            <div>
              <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground" />
              <h2 className="mt-2 text-lg font-semibold">No Chats Yet</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your conversations will appear here.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="hidden sm:flex flex-1 items-center justify-center bg-gradient-to-br from-background to-secondary">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Select a chat</h2>
          <p className="text-muted-foreground">
            Choose a conversation from the left to start messaging.
          </p>
        </div>
      </div>
    </div>
  );
}
