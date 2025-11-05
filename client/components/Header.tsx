import { Circle, MoreVertical, Camera, MessageCircle, Search } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <header className="border-b border-border bg-background">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <MessageCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">WhatsApp</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Camera className="h-5 w-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Search className="h-5 w-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <MoreVertical className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
