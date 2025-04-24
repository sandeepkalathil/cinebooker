import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Movie } from '@/types/cinema';
import { Calendar, Clock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePageViewMetrics } from '@/hooks/usePageViewMetrics';

// Sample upcoming movies data
const upcomingMovies: Movie[] = [
  {
    id: "101",
    title: "Galactic Odyssey",
    posterUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1211&q=80",
    synopsis: "A team of astronauts embarks on a perilous journey to the edge of our solar system, where they discover an ancient alien artifact that holds the key to humanity's future.",
    rating: 0,
    duration: 145,
    releaseDate: "2023-12-15",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    director: "Alexandra Chen",
    cast: ["Michael Rodriguez", "Emma Stone", "David Oyelowo"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "102",
    title: "The Last Detective",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80",
    synopsis: "In a world where AI has replaced human detectives, the last human investigator must solve a series of impossible murders that even the most advanced algorithms cannot crack.",
    rating: 0,
    duration: 128,
    releaseDate: "2023-11-24",
    genres: ["Mystery", "Thriller", "Crime"],
    director: "James Wong",
    cast: ["Denzel Washington", "Ana de Armas", "Idris Elba"]
  },
  {
    id: "103",
    title: "Whispers in the Forest",
    posterUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
    synopsis: "A family moves to a remote cabin in the woods, only to discover that the surrounding forest is home to an ancient entity that communicates through whispers in the wind.",
    rating: 0,
    duration: 115,
    releaseDate: "2024-01-12",
    genres: ["Horror", "Supernatural", "Thriller"],
    director: "Jordan Peele",
    cast: ["Lupita Nyong'o", "Winston Duke", "Elisabeth Moss"]
  },
  {
    id: "104",
    title: "The Champion's Return",
    posterUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    synopsis: "A disgraced boxer gets one last chance at redemption when he's offered a high-stakes match against the rising star who ended his career five years ago.",
    rating: 0,
    duration: 132,
    releaseDate: "2023-12-08",
    genres: ["Sports", "Drama", "Action"],
    director: "Ryan Coogler",
    cast: ["Michael B. Jordan", "Tessa Thompson", "Jonathan Majors"]
  }
];

const ComingSoon: React.FC = () => {
  usePageViewMetrics();

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Coming Soon</h1>
        
        <div className="space-y-12">
          {upcomingMovies.map((movie) => (
            <div key={movie.id} className="flex flex-col md:flex-row gap-6 bg-card rounded-lg overflow-hidden border border-border/50 shadow-sm">
              <div className="md:w-1/4 lg:w-1/5">
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {movie.genres.map((genre, index) => (
                    <Badge key={index} variant="outline">
                      {genre}
                    </Badge>
                  ))}
                </div>
                
                <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                
                <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Release: {movie.releaseDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{movie.duration} min</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {movie.synopsis}
                </p>
                
                <div className="mb-4">
                  <p><span className="font-medium">Director:</span> {movie.director}</p>
                  <p><span className="font-medium">Cast:</span> {movie.cast.join(', ')}</p>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-4">
                  <Button variant="default">
                    Watch Trailer
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Bell className="mr-2 h-4 w-4" />
                    Get Notified
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ComingSoon;