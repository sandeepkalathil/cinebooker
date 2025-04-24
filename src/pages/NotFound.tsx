import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { FilmIcon, Home, Search } from 'lucide-react';
import { usePageViewMetrics } from '@/hooks/usePageViewMetrics';

const NotFound: React.FC = () => {
  usePageViewMetrics();

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <FilmIcon className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or never existed.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="default" className="flex items-center" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            <Button variant="outline" className="flex items-center">
              <Search className="mr-2 h-4 w-4" />
              Search Movies
            </Button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/50">
            <h3 className="text-lg font-medium mb-4">You might be interested in:</h3>
            <div className="flex flex-col gap-2">
              <Link to="/movies" className="text-primary hover:underline">
                Browse All Movies
              </Link>
              <Link to="/coming-soon" className="text-primary hover:underline">
                Coming Soon
              </Link>
              <Link to="/promotions" className="text-primary hover:underline">
                Special Offers & Promotions
              </Link>
              <Link to="/contact" className="text-primary hover:underline">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;