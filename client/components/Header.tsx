import { MoreVertical, Camera, MessageCircle, Search, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('qrConnected');
    navigate('/');
  };

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

          <div className="flex items-center gap-2 relative">
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Camera className="h-5 w-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Search className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <MoreVertical className="h-5 w-5 text-foreground" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 w-40 rounded-lg border border-border bg-card shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
