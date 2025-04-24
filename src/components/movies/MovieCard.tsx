
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
    <Link to={`/movies/${movie.id}`} className="movie-card">
      <div className="movie-poster">
        <img src={movie.posterUrl} alt={movie.title} />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white border-0">
            <Star className="h-3 w-3 mr-1 fill-gold-400 text-gold-400" />
            {movie.rating.toFixed(1)}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{movie.title}</h3>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
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
