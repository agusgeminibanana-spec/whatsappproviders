
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageCircle } from 'lucide-react';
import { collection, query, onSnapshot, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming your firebase config is in firebase.ts

// Updated interface to match Firestore data structure
interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Timestamp;
  unreadCount: number;
}

// Helper function to format Firestore Timestamps
const formatTimestamp = (timestamp: Timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date >= today) {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
    if (date >= yesterday) {
        return 'Yesterday';
    }
    return date.toLocaleDateString();
};

// Helper to get initials for avatar
const getInitials = (name: string) => {
    if (!name) return '?';
    const words = name.split(' ');
    if (words.length > 1) {
        return words[0][0] + words[1][0];
    }
    return name.substring(0, 2);
};

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatsData: Chat[] = [];
      querySnapshot.forEach((doc) => {
        // Make sure to cast the document data to the expected type
        chatsData.push({ ...doc.data(), id: doc.id } as Chat);
      });
      setChats(chatsData);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const filteredChats = chats.filter((chat) =>
    chat.name && chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex w-full h-full bg-background">
      <div className="w-full sm:w-96 flex flex-col border-r border-border bg-background">
        {/* Search Bar */}
        <div className="border-b border-border p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search or start new chat"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-secondary px-4 py-2 pl-10 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <Link
              key={chat.id}
              to={`/chats/${chat.id}`}
              className="flex items-start gap-3 border-b border-border px-4 py-3 hover:bg-secondary transition-colors cursor-pointer"
            >
              {/* Avatar */}
              <div className="relative mt-1 flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {getInitials(chat.name)}
                </div>
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground truncate">
                    {chat.name}
                  </h3>
                  <span className="ml-2 flex-shrink-0 text-xs text-muted-foreground">
                    {formatTimestamp(chat.timestamp)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground truncate">
                  {chat.lastMessage}
                </p>
              </div>

              {/* Unread Badge */}
              {chat.unreadCount > 0 && (
                <div className="ml-2 flex-shrink-0">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Empty State for Desktop */}
      <div className="hidden sm:flex flex-1 items-center justify-center bg-gradient-to-br from-background to-secondary">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <MessageCircle className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Select a chat to start messaging
          </h2>
          <p className="text-muted-foreground">
            Choose from your existing conversations or start a new chat
          </p>
        </div>
      </div>
    </div>
  );
}
