import { Puzzle } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Puzzle className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold inline-block bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Jigsaw Master
            </span>
          </Link>
        </div>
        {/* Future navigation items can go here */}
      </div>
    </header>
  );
};