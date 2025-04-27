import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FilmIcon, SearchIcon, UserIcon, TicketIcon, MenuIcon, XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FilmIcon className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="font-bold text-lg md:text-xl">CineBooker</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 ml-10">
              <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
                Movies
              </Link>
              <Link to="/theaters" className="text-foreground/80 hover:text-foreground transition-colors">
                Theaters
              </Link>
              <Link to="/coming-soon" className="text-foreground/80 hover:text-foreground transition-colors">
                Coming Soon
              </Link>
              <Link to="/promotions" className="text-foreground/80 hover:text-foreground transition-colors">
                Promotions
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative w-64">
              <Input 
                type="text" 
                placeholder="Search movies..." 
                className="pr-8 bg-muted/50"
                aria-label="Search movies"
              />
              <SearchIcon className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </div>
            <Link to="/bookings" aria-label="My Bookings">
              <Button variant="ghost" size="icon" className="rounded-full">
                <TicketIcon className="h-5 w-5" aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="default" className="rounded-full">
                <UserIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                Sign In
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </Link>
              <Link 
                to="/theaters" 
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Theaters
              </Link>
              <Link 
                to="/coming-soon" 
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Coming Soon
              </Link>
              <Link 
                to="/promotions" 
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Promotions
              </Link>
              <div className="relative w-full pt-2">
                <Input 
                  type="text" 
                  placeholder="Search movies..." 
                  className="pr-8 bg-muted/50 w-full"
                  aria-label="Search movies"
                />
                <SearchIcon className="absolute right-2 top-[1.15rem] h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
