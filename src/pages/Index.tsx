import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Movie } from '@/types/cinema';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import FeaturedMovie from '@/components/movies/FeaturedMovie';
import MovieCard from '@/components/movies/MovieCard';
import { usePageViewMetrics } from '@/hooks/usePageViewMetrics';

// Sample movie data
const sampleMovies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg",
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    rating: 8.8,
    duration: 148,
    releaseDate: "2010-07-16",
    genres: ["Action", "Adventure", "Sci-Fi"],
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
  },
  {
    id: "2",
    title: "The Shawshank Redemption",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BNTYxOTYyMzE3NV5BMl5BanBnXkFtZTcwOTMxNDY3Mw@@._V1_.jpg",
    synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    rating: 9.3,
    duration: 142,
    releaseDate: "1994-10-14",
    genres: ["Drama"],
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
  },
  {
    id: "3",
    title: "The Dark Knight",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_.jpg",
    synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    rating: 9.0,
    duration: 152,
    releaseDate: "2008-07-18",
    genres: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
  },
  {
    id: "4",
    title: "Pulp Fiction",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    synopsis: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    rating: 8.9,
    duration: 154,
    releaseDate: "1994-10-14",
    genres: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"]
  },
  {
    id: "5",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BMTM5MTYyNTcxNl5BMl5BanBnXkFtZTcwOTg2Njc4Ng@@._V1_.jpg",
    synopsis: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    rating: 8.8,
    duration: 178,
    releaseDate: "2001-12-19",
    genres: ["Action", "Adventure", "Drama"],
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"]
  }
];

const Index: React.FC = () => {
  usePageViewMetrics();
  const [featuredMovie] = useState<Movie>(sampleMovies[0]);
  const [nowShowingMovies] = useState<Movie[]>(sampleMovies.slice(0, 5));

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section with Featured Movie */}
        <FeaturedMovie movie={featuredMovie} />
        
        {/* Now Showing Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Now Showing</h2>
            <Link to="/movies" className="flex items-center text-primary hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
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
              <div className="absolute right-0 top-0 h-full w-1/3 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80')] bg-cover bg-center opacity-25 md:opacity-75"></div>
            </div>
          </div>
        </section>
        
        {/* Coming Soon Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Coming Soon</h2>
            <Link to="/coming-soon" className="flex items-center text-primary hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {/* Using the same movies for demo purposes */}
            {nowShowingMovies.slice(0, 4).map((movie) => (
              <MovieCard key={`coming-${movie.id}`} movie={{...movie, id: `coming-${movie.id}`}} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;