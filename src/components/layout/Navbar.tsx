
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FilmIcon, SearchIcon, UserIcon, TicketIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FilmIcon className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg md:text-xl">CineBooker</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 ml-10">
              <Link to="/movies" className="text-foreground/80 hover:text-foreground transition-colors">
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
              />
              <SearchIcon className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <Link to="/bookings">
              <Button variant="ghost" size="icon" className="rounded-full">
                <TicketIcon className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="default" className="rounded-full">
                <UserIcon className="h-5 w-5 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
