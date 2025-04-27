import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Movie } from '@/types/cinema';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import FeaturedMovie from '@/components/movies/FeaturedMovie';
import MovieCard from '@/components/movies/MovieCard';
import { usePageViewMetrics } from '@/hooks/usePageViewMetrics';
import { movies } from '@/data/mockData';

const Index: React.FC = () => {
  usePageViewMetrics();
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [nowShowingMovies, setNowShowingMovies] = useState<Movie[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      // Get movies from mock data
      if (movies && movies.length > 0) {
        // Set featured movie (first movie)
        setFeaturedMovie(movies[0]);
        
        // Set now showing movies (first 6 movies)
        setNowShowingMovies(movies.slice(0, 6));
        
        // Set coming soon movies (next 4 movies)
        setComingSoonMovies(movies.slice(7, 11));
      }
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center py-12">Loading movies...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section with Featured Movie */}
        {featuredMovie && <FeaturedMovie movie={featuredMovie} />}
        
        {/* Now Showing Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Now Showing</h2>
            <Link to="/" className="flex items-center text-primary hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {nowShowingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
        
        {/* Promotions Banner */}
        <section className="bg-card py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg p-8 relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                <h2 className="text-3xl font-bold mb-4">Special Offers</h2>
                <p className="text-lg mb-6">
                  Get exclusive deals and discounts on movie tickets, concessions, and more!
                </p>
                <Button size="lg" asChild>
                  <Link to="/promotions">View Offers</Link>
                </Button>
              </div>
              <div 
                className="absolute right-0 top-0 h-full w-1/3 bg-cover bg-center opacity-25 md:opacity-75"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80')"}}
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </section>
        
        {/* Coming Soon Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Coming Soon</h2>
            <Link to="/coming-soon" className="flex items-center text-primary hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {comingSoonMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
