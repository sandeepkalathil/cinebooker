export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  duration: number;
  rating: number;
  genres: string[];
  synopsis: string;
  director: string;
  cast: string[];
  trailerUrl?: string;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  screens: Screen[];
}

export interface Screen {
  id: string;
  name: string;
  features: string[];
  seatsLayout: SeatRow[];
}

export interface SeatRow {
  row: string;
  seats: Seat[];
}

export interface Seat {
  id: string;
  number: number;
  type: 'standard' | 'premium';
  status: 'available' | 'reserved' | 'booked';
}

export interface Showtime {
  id: string;
  movieId: string;
  theaterId: string;
  screenId: string;
  startTime: string;
  endTime: string;
  price: {
    standard: number;
    premium: number;
  };
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
  status: 'confirmed' | 'pending' | 'cancelled';
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
