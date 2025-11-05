import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Edit3, MessageCircle } from 'lucide-react';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online?: boolean;
}

export default function ChatList() {
  const [chats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      lastMessage: 'Sounds great! See you tomorrow',
      timestamp: '2:45 PM',
      unread: 0,
      online: true,
    },
    {
      id: '2',
      name: 'Family Group',
      avatar: 'FG',
      lastMessage: 'Mom: Did you see the photos from vacation?',
      timestamp: '1:30 PM',
      unread: 3,
      online: false,
    },
    {
      id: '3',
      name: 'John Smith',
      avatar: 'JS',
      lastMessage: 'Thanks for the recommendation!',
      timestamp: 'Yesterday',
      unread: 0,
      online: true,
    },
    {
      id: '4',
      name: 'Work Team',
      avatar: 'WT',
      lastMessage: 'Alex: Project deadline moved to Friday',
      timestamp: 'Yesterday',
      unread: 5,
      online: false,
    },
    {
      id: '5',
      name: 'Emma Davis',
      avatar: 'ED',
      lastMessage: 'That sounds perfect!',
      timestamp: 'Monday',
      unread: 0,
      online: false,
    },
    {
      id: '6',
      name: 'Design Team',
      avatar: 'DT',
      lastMessage: 'Design files are ready for review',
      timestamp: 'Monday',
      unread: 0,
      online: false,
    },
    {
      id: '7',
      name: 'Michael Brown',
      avatar: 'MB',
      lastMessage: 'Let\'s catch up soon!',
      timestamp: 'Sunday',
      unread: 0,
      online: true,
    },
    {
      id: '8',
      name: 'Project Group',
      avatar: 'PG',
      lastMessage: 'All tasks completed on schedule',
      timestamp: 'Sunday',
      unread: 0,
      online: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex w-full h-full bg-background">
      {/* Chat List Sidebar */}
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
              to={`/chat/${chat.id}`}
              className="flex items-start gap-3 border-b border-border px-4 py-3 hover:bg-secondary transition-colors cursor-pointer"
            >
              {/* Avatar */}
              <div className="relative mt-1 flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {chat.avatar}
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-background" />
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground truncate">
                    {chat.name}
                  </h3>
                  <span className="ml-2 flex-shrink-0 text-xs text-muted-foreground">
                    {chat.timestamp}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground truncate">
                  {chat.lastMessage}
                </p>
              </div>

              {/* Unread Badge */}
              {chat.unread > 0 && (
                <div className="ml-2 flex-shrink-0">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {chat.unread > 9 ? '9+' : chat.unread}
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
