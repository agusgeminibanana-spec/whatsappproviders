
import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip, Smile } from 'lucide-react';
import { db } from '../firebase'; // Make sure this path is correct
import {
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc,
  Timestamp 
} from 'firebase/firestore';

// Interfaces to match Firestore data structure
interface Message {
  id: string;
  text: string;
  fromMe: boolean; // Using fromMe to determine sender
  timestamp: Timestamp;
}

interface ChatContact {
  id: string;
  name: string;
}

// Helper to format timestamps
const formatTimestamp = (timestamp: Timestamp) => {
    if (!timestamp) return '';
    return timestamp.toDate().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

// Helper to get initials
const getInitials = (name: string) => {
    if (!name) return '?';
    const words = name.split(' ');
    if (words.length > 1) return words[0][0] + words[1][0];
    return name.substring(0, 2);
};

export default function ChatDetail() {
  const { id } = useParams<{ id: string }>(); // This is the chatId
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageInput, setMessageInput] = useState('');
  const [contact, setContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Effect to fetch contact details
  useEffect(() => {
    if (!id) return;
    const chatDocRef = doc(db, 'chats', id);
    const unsubscribe = onSnapshot(chatDocRef, (doc) => {
      if (doc.exists()) {
        setContact({ id: doc.id, ...doc.data() } as ChatContact);
      }
    });
    return () => unsubscribe();
  }, [id]);

  // Effect to fetch messages
  useEffect(() => {
    if (!id) return;
    const messagesRef = collection(db, 'chats', id, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs: Message[] = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !id) return;

    const text = messageInput;
    setMessageInput('');

    try {
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatId: id, text }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally, show an error to the user
    }
  };

  if (!contact) {
    return <div>Loading chat...</div>; // Or a more sophisticated loading state
  }

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-background to-secondary/30">
      {/* Chat Header */}
      <div className="border-b border-border bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
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
              {/* Online status can be added later if needed */}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-secondary rounded-full transition-colors"><Phone className="h-5 w-5 text-foreground" /></button>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors"><Video className="h-5 w-5 text-foreground" /></button>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors"><MoreVertical className="h-5 w-5 text-foreground" /></button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.fromMe ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg rounded-2xl px-4 py-2 ${message.fromMe
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-card text-card-foreground border border-border rounded-bl-none"}`}>
              <p className="break-words text-sm">{message.text}</p>
              <div
                className={`mt-1 flex items-center justify-end gap-1 text-xs ${message.fromMe
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"}`}>
                <span>{formatTimestamp(message.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-border bg-background px-4 py-3">
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <button type="button" className="p-2 hover:bg-secondary rounded-full transition-colors flex-shrink-0"><Smile className="h-5 w-5 text-foreground" /></button>
          <button type="button" className="p-2 hover:bg-secondary rounded-full transition-colors flex-shrink-0"><Paperclip className="h-5 w-5 text-foreground" /></button>
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
