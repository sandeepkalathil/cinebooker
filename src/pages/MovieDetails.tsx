import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Movie } from '@/types/cinema';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Star, PlayCircle, CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { usePageViewMetrics } from '@/hooks/usePageViewMetrics';
import { getMovieById } from '@/data/mockData';

const MovieDetails: React.FC = () => {
  usePageViewMetrics();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState<string>("2023-10-25");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Reset state when the route changes
    setLoading(true);
    setError(null);
    
    // Get the movie by ID from our mock data
    if (id) {
      try {
        const foundMovie = getMovieById(id);
        if (foundMovie) {
          setMovie(foundMovie);
        } else {
          setError("Movie not found");
        }
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    }
  }, [id, location.pathname]);
  
  // Sample showtimes
  const showtimes = [
    { time: "10:30 AM", theater: "CineBooker IMAX", screen: "Screen 1", available: true },
    { time: "1:15 PM", theater: "CineBooker IMAX", screen: "Screen 3", available: true },
    { time: "4:00 PM", theater: "CineBooker Multiplex", screen: "Screen 5", available: true },
    { time: "7:30 PM", theater: "CineBooker IMAX", screen: "Screen 1", available: true },
    { time: "10:45 PM", theater: "CineBooker Premiere", screen: "Screen 2", available: false }
  ];
  
  // Sample dates for the date picker
  const dates = [
    { date: "2023-10-25", day: "Today" },
    { date: "2023-10-26", day: "Thu" },
    { date: "2023-10-27", day: "Fri" },
    { date: "2023-10-28", day: "Sat" },
    { date: "2023-10-29", day: "Sun" }
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Loading movie details...</h1>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !movie) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Movie not found</h1>
            <p className="mt-4">The movie you're looking for doesn't exist or has been removed.</p>
            <Button className="mt-6" asChild>
              <Link to="/">Browse Movies</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section with Backdrop */}
        <div className="relative w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
          <div 
            className="relative w-full h-[70vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.backdropUrl})` }}
            aria-label={`${movie.title} backdrop`}
          >
            <div className="absolute inset-0 bg-black/30 z-0"></div>
            
            <div className="container mx-auto px-4 h-full flex items-end pb-16 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end w-full">
                <div className="md:col-span-3 hidden md:block">
                  <div className="overflow-hidden rounded-lg shadow-2xl border border-white/10">
                    <img 
                      src={movie.posterUrl} 
                      alt={`${movie.title} poster`} 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-9">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {movie.genres.map((genre, index) => (
                      <Badge key={index} className="bg-primary/70 text-white hover:bg-primary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                    {movie.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 mr-1 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                      <span className="text-white">{movie.rating.toFixed(1)}/10</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-1 text-white" aria-hidden="true" />
                      <span className="text-white">{movie.duration} min</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-1 text-white" aria-hidden="true" />
                      <span className="text-white">{movie.releaseDate}</span>
                    </div>
                  </div>
                  
                  <p className="text-white/90 mb-6 max-w-3xl">
                    {movie.synopsis}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                      <Link to={`/movies/${id}/booking`}>Book Tickets</Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white/50 text-white hover:bg-white/10"
                      onClick={() => movie.trailerUrl && window.open(movie.trailerUrl, '_blank')}
                    >
                      <PlayCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                      Watch Trailer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Movie Details */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
              <p className="text-muted-foreground mb-8">
                {movie.synopsis}
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Cast & Crew</h2>
              <div className="mb-8">
                <p className="mb-2"><span className="font-medium">Director:</span> {movie.director}</p>
                <p><span className="font-medium">Cast:</span> {movie.cast.join(', ')}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Showtimes</h2>
              
              {/* Date Picker */}
              <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
                {dates.map((date) => (
                  <Button
                    key={date.date}
                    variant={selectedDate === date.date ? "default" : "outline"}
                    className="flex flex-col items-center px-4 py-2"
                    onClick={() => setSelectedDate(date.date)}
                  >
                    <CalendarDays className="h-4 w-4 mb-1" aria-hidden="true" />
                    <span>{date.day}</span>
                  </Button>
                ))}
              </div>
              
              {/* Showtimes */}
              <div className="space-y-4">
                {showtimes.map((showtime, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border rounded-md ${showtime.available ? 'border-border' : 'border-border/30 opacity-50'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{showtime.time}</span>
                      <Badge variant="outline">{showtime.screen}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{showtime.theater}</p>
                    <Button 
                      variant="default" 
                      className="w-full" 
                      disabled={!showtime.available}
                      asChild
                    >
                      <Link to={showtime.available ? `/movies/${id}/booking` : '#'}>
                        {showtime.available ? 'Book Now' : 'Sold Out'}
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MovieDetails;