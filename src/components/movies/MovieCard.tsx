import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '@/types/cinema';
import { Star, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link 
      to={`/movies/${movie.id}`} 
      className="group block rounded-lg overflow-hidden border border-border/50 transition-all hover:border-primary/50 hover:shadow-md"
      aria-label={`View details for ${movie.title}`}
    >
      <div className="relative overflow-hidden">
        <img 
          src={movie.posterUrl} 
          alt={`${movie.title} poster`} 
          className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white border-0">
            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            {movie.rating.toFixed(1)}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{movie.title}</h3>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
          <span>{movie.duration} min</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((genre, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
