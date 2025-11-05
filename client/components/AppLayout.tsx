import { ReactNode } from 'react';
import Header from './Header';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
