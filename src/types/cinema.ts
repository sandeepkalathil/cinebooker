export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  synopsis: string;
  rating: number;
  duration: number;
  releaseDate: string;
  genres: string[];
  director: string;
  cast: string[];
  trailerUrl?: string;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  address: string;
  screens: number;
  amenities: string[];
  imageUrl: string;
}

export interface Showtime {
  id: string;
  movieId: string;
  theaterId: string;
  screen: string;
  time: string;
  date: string;
  price: number;
  seatsAvailable: number;
}

export interface Booking {
  id: string;
  userId: string;
  showtimeId: string;
  movieId: string;
  theaterId: string;
  seats: string[];
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'pending';
}

export interface SeatRow {
  row: string;
  seats: Seat[];
}

export interface Seat {
  id: string;
  row: string;
  number: string;
  status: 'available' | 'reserved';
  type: 'standard' | 'premium';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bookings?: Booking[];
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  validFrom: string;
  validTo: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  code: string;
}