import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Movie, SeatRow } from '@/types/cinema';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Film, MapPin, Ticket } from 'lucide-react';
import SeatMap from '@/components/booking/SeatMap';
import { usePageViewMetrics } from '@/hooks/usePageViewMetrics';

// Sample movie data
const sampleMovie: Movie = {
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
};

// Sample seat layout
const sampleSeatsLayout: SeatRow[] = [
  {
    row: "A",
    seats: [
      { id: "A1", row: "A", number: "1", status: "available", type: "standard" },
      { id: "A2", row: "A", number: "2", status: "available", type: "standard" },
      { id: "A3", row: "A", number: "3", status: "reserved", type: "standard" },
      { id: "A4", row: "A", number: "4", status: "available", type: "standard" },
      { id: "A5", row: "A", number: "5", status: "available", type: "standard" },
      { id: "A6", row: "A", number: "6", status: "available", type: "standard" },
      { id: "A7", row: "A", number: "7", status: "available", type: "standard" },
      { id: "A8", row: "A", number: "8", status: "available", type: "standard" },
    ]
  },
  {
    row: "B",
    seats: [
      { id: "B1", row: "B", number: "1", status: "available", type: "standard" },
      { id: "B2", row: "B", number: "2", status: "available", type: "standard" },
      { id: "B3", row: "B", number: "3", status: "available", type: "standard" },
      { id: "B4", row: "B", number: "4", status: "reserved", type: "standard" },
      { id: "B5", row: "B", number: "5", status: "reserved", type: "standard" },
      { id: "B6", row: "B", number: "6", status: "available", type: "standard" },
      { id: "B7", row: "B", number: "7", status: "available", type: "standard" },
      { id: "B8", row: "B", number: "8", status: "available", type: "standard" },
    ]
  },
  {
    row: "C",
    seats: [
      { id: "C1", row: "C", number: "1", status: "available", type: "standard" },
      { id: "C2", row: "C", number: "2", status: "available", type: "standard" },
      { id: "C3", row: "C", number: "3", status: "available", type: "standard" },
      { id: "C4", row: "C", number: "4", status: "available", type: "standard" },
      { id: "C5", row: "C", number: "5", status: "available", type: "standard" },
      { id: "C6", row: "C", number: "6", status: "available", type: "standard" },
      { id: "C7", row: "C", number: "7", status: "available", type: "standard" },
      { id: "C8", row: "C", number: "8", status: "available", type: "standard" },
    ]
  },
  {
    row: "D",
    seats: [
      { id: "D1", row: "D", number: "1", status: "available", type: "standard" },
      { id: "D2", row: "D", number: "2", status: "available", type: "standard" },
      { id: "D3", row: "D", number: "3", status: "available", type: "standard" },
      { id: "D4", row: "D", number: "4", status: "available", type: "standard" },
      { id: "D5", row: "D", number: "5", status: "available", type: "standard" },
      { id: "D6", row: "D", number: "6", status: "available", type: "standard" },
      { id: "D7", row: "D", number: "7", status: "available", type: "standard" },
      { id: "D8", row: "D", number: "8", status: "available", type: "standard" },
    ]
  },
  {
    row: "E",
    seats: [
      { id: "E1", row: "E", number: "1", status: "available", type: "premium" },
      { id: "E2", row: "E", number: "2", status: "available", type: "premium" },
      { id: "E3", row: "E", number: "3", status: "available", type: "premium" },
      { id: "E4", row: "E", number: "4", status: "available", type: "premium" },
      { id: "E5", row: "E", number: "5", status: "available", type: "premium" },
      { id: "E6", row: "E", number: "6", status: "available", type: "premium" },
      { id: "E7", row: "E", number: "7", status: "available", type: "premium" },
      { id: "E8", row: "E", number: "8", status: "available", type: "premium" },
    ]
  },
  {
    row: "F",
    seats: [
      { id: "F1", row: "F", number: "1", status: "available", type: "premium" },
      { id: "F2", row: "F", number: "2", status: "available", type: "premium" },
      { id: "F3", row: "F", number: "3", status: "reserved", type: "premium" },
      { id: "F4", row: "F", number: "4", status: "reserved", type: "premium" },
      { id: "F5", row: "F", number: "5", status: "reserved", type: "premium" },
      { id: "F6", row: "F", number: "6", status: "available", type: "premium" },
      { id: "F7", row: "F", number: "7", status: "available", type: "premium" },
      { id: "F8", row: "F", number: "8", status: "available", type: "premium" },
    ]
  }
];

const Booking: React.FC = () => {
  usePageViewMetrics();
  const { id } = useParams<{ id: string }>();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // Ticket prices
  const standardPrice = 12;
  const premiumPrice = 18;
  
  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    selectedSeats.forEach(seatId => {
      // Find the seat in the layout
      for (const row of sampleSeatsLayout) {
        const seat = row.seats.find(s => s.id === seatId);
        if (seat) {
          total += seat.type === 'premium' ? premiumPrice : standardPrice;
          break;
        }
      }
    });
    return total;
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Select Seats</h1>
          
          {/* Movie Info */}
          <div className="bg-card rounded-lg p-6 mb-8 border border-border/50">
            <div className="flex items-center">
              <div className="w-24 h-36 overflow-hidden rounded-md mr-4">
                <img 
                  src={sampleMovie.posterUrl} 
                  alt={sampleMovie.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">{sampleMovie.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Oct 25, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>7:30 PM</span>
                  </div>
                  <div className="flex items-center">
                    <Film className="h-4 w-4 mr-1" />
                    <span>Screen 1</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>CineBooker IMAX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Seat Selection */}
          <div className="bg-card rounded-lg p-6 mb-8 border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Choose Your Seats</h2>
            <SeatMap seatsLayout={sampleSeatsLayout} onSelectSeats={setSelectedSeats} />
          </div>
          
          {/* Booking Summary */}
          <div className="bg-card rounded-lg p-6 border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Selected Seats:</span>
                <span>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Standard Seats:</span>
                <span>${standardPrice.toFixed(2)} x {selectedSeats.filter(seatId => {
                  for (const row of sampleSeatsLayout) {
                    const seat = row.seats.find(s => s.id === seatId);
                    if (seat && seat.type === 'standard') return true;
                  }
                  return false;
                }).length}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Premium Seats:</span>
                <span>${premiumPrice.toFixed(2)} x {selectedSeats.filter(seatId => {
                  for (const row of sampleSeatsLayout) {
                    const seat = row.seats.find(s => s.id === seatId);
                    if (seat && seat.type === 'premium') return true;
                  }
                  return false;
                }).length}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Booking Fee:</span>
                <span>$1.50</span>
              </div>
              
              <div className="border-t pt-4 flex justify-between font-semibold">
                <span>Total:</span>
                <span>${(calculateTotal() + 1.50).toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full flex items-center justify-center" 
              size="lg"
              disabled={selectedSeats.length === 0}
            >
              <Ticket className="mr-2 h-5 w-5" />
              Proceed to Payment
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Booking;