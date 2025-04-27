import React from 'react';
import { Movie } from '@/types/cinema';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, Star, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface FeaturedMovieProps {
  movie: Movie;
}

const FeaturedMovie: React.FC<FeaturedMovieProps> = ({ movie }) => {
  return (
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
                  <CalendarIcon className="h-5 w-5 mr-1 text-white" aria-hidden="true" />
                  <span className="text-white">{movie.releaseDate}</span>
                </div>
              </div>
              
              <p className="text-white/90 mb-6 max-w-3xl line-clamp-3">
                {movie.synopsis}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <Link to={`/movies/${movie.id}/booking`}>
                    Book Tickets
                  </Link>
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
  );
};

export default FeaturedMovie;