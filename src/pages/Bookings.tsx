import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Booking } from '@/types/cinema';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Film, MapPin, Download, X, Check } from 'lucide-react';
import { usePageViewMetrics } from '@/hooks/usePageViewMetrics';

// Sample bookings data
const sampleBookings: Booking[] = [
  {
    id: "B1001",
    userId: "U123",
    showtimeId: "ST456",
    movieId: "1",
    theaterId: "T1",
    seats: ["E4", "E5", "E6"],
    totalPrice: 54.50,
    bookingDate: "2023-10-20",
    status: "confirmed"
  },
  {
    id: "B1002",
    userId: "U123",
    showtimeId: "ST789",
    movieId: "2",
    theaterId: "T2",
    seats: ["C7", "C8"],
    totalPrice: 25.00,
    bookingDate: "2023-10-15",
    status: "confirmed"
  },
  {
    id: "B1003",
    userId: "U123",
    showtimeId: "ST101",
    movieId: "3",
    theaterId: "T1",
    seats: ["D3", "D4"],
    totalPrice: 25.00,
    bookingDate: "2023-09-30",
    status: "cancelled"
  }
];

// Sample movie data mapping
const movieData: Record<string, { title: string, posterUrl: string }> = {
  "1": {
    title: "Inception",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
  },
  "2": {
    title: "The Shawshank Redemption",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
  },
  "3": {
    title: "The Dark Knight",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
  }
};

// Sample theater data mapping
const theaterData: Record<string, { name: string }> = {
  "T1": { name: "CineBooker IMAX" },
  "T2": { name: "CineBooker Multiplex" }
};

// Sample showtime data mapping
const showtimeData: Record<string, { date: string, time: string, screen: string }> = {
  "ST456": { date: "2023-10-25", time: "7:30 PM", screen: "Screen 1" },
  "ST789": { date: "2023-10-22", time: "4:15 PM", screen: "Screen 3" },
  "ST101": { date: "2023-10-05", time: "8:00 PM", screen: "Screen 2" }
};

const Bookings: React.FC = () => {
  usePageViewMetrics();

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        
        {sampleBookings.length > 0 ? (
          <div className="space-y-6">
            {sampleBookings.map((booking) => (
              <div 
                key={booking.id} 
                className={`bg-card rounded-lg overflow-hidden border ${
                  booking.status === 'confirmed' ? 'border-border/50' : 'border-border/30'
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 lg:w-1/5">
                    <img 
                      src={movieData[booking.movieId].posterUrl} 
                      alt={movieData[booking.movieId].title} 
                      className={`w-full h-full object-cover ${
                        booking.status === 'cancelled' ? 'opacity-50' : ''
                      }`}
                    />
                  </div>
                  
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold">
                        {movieData[booking.movieId].title}
                      </h2>
                      <div>
                        {booking.status === 'confirmed' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            <Check className="w-3 h-3 mr-1" />
                            Confirmed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                            <X className="w-3 h-3 mr-1" />
                            Cancelled
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{showtimeData[booking.showtimeId].date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{showtimeData[booking.showtimeId].time}</span>
                      </div>
                      <div className="flex items-center">
                        <Film className="h-4 w-4 mr-1" />
                        <span>{showtimeData[booking.showtimeId].screen}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{theaterData[booking.theaterId].name}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p><span className="font-medium">Booking ID:</span> {booking.id}</p>
                      <p><span className="font-medium">Seats:</span> {booking.seats.join(', ')}</p>
                      <p><span className="font-medium">Total Price:</span> ${booking.totalPrice.toFixed(2)}</p>
                      <p><span className="font-medium">Booked On:</span> {booking.bookingDate}</p>
                    </div>
                    
                    <div className="flex space-x-3">
                      {booking.status === 'confirmed' && (
                        <>
                          <Button variant="default" className="flex items-center">
                            <Download className="mr-2 h-4 w-4" />
                            Download Ticket
                          </Button>
                          <Button variant="outline">
                            Cancel Booking
                          </Button>
                        </>
                      )}
                      {booking.status === 'cancelled' && (
                        <Button variant="outline">
                          Remove from History
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">You don't have any bookings yet.</p>
            <Button variant="default">Browse Movies</Button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Bookings;