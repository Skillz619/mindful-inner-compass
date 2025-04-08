
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <header className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-calm-400 to-soothing-400 flex items-center justify-center text-white font-bold text-lg">
              M
            </div>
            <span className="ml-2 text-xl font-semibold">Mindful</span>
          </Link>
        </div>
        
        <div className="hidden md:flex gap-6 items-center">
          <nav className="flex gap-4 items-center">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/meditation" className="text-muted-foreground hover:text-foreground transition-colors">
              Meditation
            </Link>
            <Link to="/journal" className="text-muted-foreground hover:text-foreground transition-colors">
              Journal
            </Link>
            <Link to="/breathing" className="text-muted-foreground hover:text-foreground transition-colors">
              Breathing
            </Link>
            <Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </Link>
          </nav>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        
        {/* Mobile menu */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full mr-2"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-medium hover:text-calm-500 transition-colors">
                  Home
                </Link>
                <Link to="/meditation" className="text-lg font-medium hover:text-calm-500 transition-colors">
                  Meditation
                </Link>
                <Link to="/journal" className="text-lg font-medium hover:text-calm-500 transition-colors">
                  Journal
                </Link>
                <Link to="/breathing" className="text-lg font-medium hover:text-calm-500 transition-colors">
                  Breathing
                </Link>
                <Link to="/resources" className="text-lg font-medium hover:text-calm-500 transition-colors">
                  Resources
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
