import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip, Smile } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  lastSeen?: string;
}

export default function ChatDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageInput, setMessageInput] = useState('');

  const [contact] = useState<ChatContact>({
    id: id || '1',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    online: true,
    lastSeen: 'Active now',
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! How are you doing?',
      sender: 'contact',
      timestamp: '10:30 AM',
      status: 'read',
    },
    {
      id: '2',
      text: 'I\'m doing great! Just finished that project we discussed',
      sender: 'user',
      timestamp: '10:32 AM',
      status: 'read',
    },
    {
      id: '3',
      text: 'That\'s awesome! I\'d love to see what you\'ve done',
      sender: 'contact',
      timestamp: '10:33 AM',
      status: 'read',
    },
    {
      id: '4',
      text: 'I\'ll send you the files later today',
      sender: 'user',
      timestamp: '10:34 AM',
      status: 'delivered',
    },
    {
      id: '5',
      text: 'Perfect! 😊',
      sender: 'contact',
      timestamp: '10:35 AM',
      status: 'read',
    },
    {
      id: '6',
      text: 'By the way, are we still on for tomorrow?',
      sender: 'contact',
      timestamp: '10:36 AM',
      status: 'read',
    },
    {
      id: '7',
      text: 'Yes, definitely! Looking forward to it',
      sender: 'user',
      timestamp: '10:37 AM',
      status: 'read',
    },
    {
      id: '8',
      text: 'Sounds great! See you tomorrow',
      sender: 'contact',
      timestamp: '2:45 PM',
      status: 'read',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: String(messages.length + 1),
      text: messageInput,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
      status: 'sent',
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');

    // Simulate a response after 1 second
    setTimeout(() => {
      const responses = [
        'That sounds good!',
        'I agree! 👍',
        'Let\'s do it!',
        'Sounds perfect!',
        'I\'ll let you know!',
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          text: randomResponse,
          sender: 'contact',
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
          status: 'delivered',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-background to-secondary/30">
      {/* Chat Header */}
      <div className="border-b border-border bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-secondary rounded-full transition-colors sm:hidden"
            >
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <div className="relative flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                {contact.avatar}
              </div>
              {contact.online && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-background" />
              )}
            </div>
            <div className="min-w-0">
              <h2 className="font-semibold text-foreground">{contact.name}</h2>
              <p className="text-xs text-muted-foreground">
                {contact.online ? 'Active now' : contact.lastSeen}
              </p>
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

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-card text-card-foreground border border-border rounded-bl-none'
              }`}
            >
              <p className="break-words text-sm">{message.text}</p>
              <div
                className={`mt-1 flex items-center justify-end gap-1 text-xs ${
                  message.sender === 'user'
                    ? 'text-primary-foreground/70'
                    : 'text-muted-foreground'
                }`}
              >
                <span>{message.timestamp}</span>
                {message.sender === 'user' && (
                  <span>
                    {message.status === 'read'
                      ? '✓✓'
                      : message.status === 'delivered'
                        ? '✓✓'
                        : '✓'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
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
