import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Film, MapPin, CreditCard, Users } from 'lucide-react';
import { usePageViewMetrics } from '@/hooks/usePageViewMetrics';
import { getMovieById } from '@/data/mockData';

const MovieBooking: React.FC = () => {
  usePageViewMetrics();
  const { id } = useParams<{ id: string }>();
  const movie = id ? getMovieById(id) : null;
  
  const [selectedDate, setSelectedDate] = useState('2023-10-25');
  const [selectedTime, setSelectedTime] = useState('7:30 PM');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  
  // Sample dates
  const dates = [
    { date: "2023-10-25", day: "Wed", month: "Oct" },
    { date: "2023-10-26", day: "Thu", month: "Oct" },
    { date: "2023-10-27", day: "Fri", month: "Oct" },
    { date: "2023-10-28", day: "Sat", month: "Oct" },
    { date: "2023-10-29", day: "Sun", month: "Oct" }
  ];
  
  // Sample showtimes
  const showtimes = [
    { time: "10:30 AM", theater: "CineBooker IMAX", screen: "Screen 1" },
    { time: "1:15 PM", theater: "CineBooker IMAX", screen: "Screen 3" },
    { time: "4:00 PM", theater: "CineBooker Multiplex", screen: "Screen 5" },
    { time: "7:30 PM", theater: "CineBooker IMAX", screen: "Screen 1" },
    { time: "10:45 PM", theater: "CineBooker Premiere", screen: "Screen 2" }
  ];
  
  // Generate a 10x8 seating grid
  const generateSeats = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const unavailableSeats = ['A1', 'A2', 'B5', 'C7', 'D3', 'E8', 'F4', 'G9', 'H2', 'H3'];
    
    return rows.map(row => (
      <div key={row} className="flex justify-center mb-2">
        <div className="w-6 flex items-center justify-center mr-2">{row}</div>
        {cols.map(col => {
          const seatId = `${row}${col}`;
          const isUnavailable = unavailableSeats.includes(seatId);
          const isSelected = selectedSeats.includes(seatId);
          
          return (
            <button
              key={seatId}
              disabled={isUnavailable}
              className={`w-8 h-8 m-1 rounded-t-md flex items-center justify-center text-xs ${
                isUnavailable 
                  ? 'bg-muted/30 text-muted-foreground cursor-not-allowed' 
                  : isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 hover:bg-muted/80'
              }`}
              onClick={() => {
                if (isSelected) {
                  setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
                } else {
                  setSelectedSeats([...selectedSeats, seatId]);
                }
              }}
            >
              {col}
            </button>
          );
        })}
      </div>
    ));
  };
  
  if (!movie) {
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
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Booking Header */}
          <div className="flex items-center mb-8">
            <img 
              src={movie.posterUrl} 
              alt={movie.title} 
              className="w-16 h-24 object-cover rounded-md mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold">{movie.title}</h1>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>{movie.duration} min</span>
              </div>
            </div>
          </div>
          
          {/* Booking Steps */}
          <div className="flex justify-between mb-8">
            <div 
              className={`flex-1 text-center pb-2 border-b-2 ${
                step === 1 ? 'border-primary text-primary' : 'border-muted text-muted-foreground'
              }`}
            >
              1. Select Showtime
            </div>
            <div 
              className={`flex-1 text-center pb-2 border-b-2 ${
                step === 2 ? 'border-primary text-primary' : 'border-muted text-muted-foreground'
              }`}
            >
              2. Select Seats
            </div>
            <div 
              className={`flex-1 text-center pb-2 border-b-2 ${
                step === 3 ? 'border-primary text-primary' : 'border-muted text-muted-foreground'
              }`}
            >
              3. Payment
            </div>
          </div>
          
          {/* Step 1: Select Showtime */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
              
              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Date</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {dates.map((date) => (
                    <Button
                      key={date.date}
                      variant={selectedDate === date.date ? "default" : "outline"}
                      className="flex flex-col items-center h-auto py-3"
                      onClick={() => setSelectedDate(date.date)}
                    >
                      <span className="text-xs">{date.month}</span>
                      <span className="text-lg font-bold">{date.date.split('-')[2]}</span>
                      <span className="text-xs">{date.day}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Time Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-3">Showtimes</h3>
                <div className="space-y-4">
                  {showtimes.map((showtime) => (
                    <div 
                      key={showtime.time}
                      className={`p-4 border rounded-md cursor-pointer ${
                        selectedTime === showtime.time 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedTime(showtime.time)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{showtime.time}</p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{showtime.theater}</span>
                            <span className="mx-2">•</span>
                            <Film className="h-4 w-4 mr-1" />
                            <span>{showtime.screen}</span>
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          From $12.50
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => setStep(2)}>
                  Continue to Seat Selection
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 2: Select Seats */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Select Your Seats</h2>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-muted/50 rounded-t-sm mr-2"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-primary rounded-t-sm mr-2"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-muted/30 rounded-t-sm mr-2"></div>
                    <span>Unavailable</span>
                  </div>
                </div>
                
                {/* Screen */}
                <div className="w-full bg-muted/30 h-2 rounded-lg mb-8 relative">
                  <div className="absolute -bottom-6 w-full text-center text-xs text-muted-foreground">
                    SCREEN
                  </div>
                </div>
                
                {/* Seats */}
                <div className="mt-12 mb-8">
                  {generateSeats()}
                </div>
                
                {/* Selected Seats Summary */}
                <div className="bg-card p-4 rounded-lg border border-border/50 mb-6">
                  <h3 className="font-medium mb-2">Selected Seats</h3>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                    {selectedSeats.length > 0 ? (
                      <span>{selectedSeats.join(', ')} ({selectedSeats.length} seats)</span>
                    ) : (
                      <span className="text-muted-foreground">No seats selected</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={selectedSeats.length === 0}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 3: Payment */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment</h2>
              
              {/* Booking Summary */}
              <div className="bg-card p-6 rounded-lg border border-border/50 mb-6">
                <h3 className="font-medium mb-4">Booking Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Movie</span>
                    <span>{movie.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Theater</span>
                    <span>CineBooker IMAX, Screen 1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seats</span>
                    <span>{selectedSeats.join(', ')}</span>
                  </div>
                </div>
                
                <div className="border-t border-border/50 pt-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Ticket Price (x{selectedSeats.length})</span>
                    <span>${(12.50 * selectedSeats.length).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Booking Fee</span>
                    <span>$1.50</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${(12.50 * selectedSeats.length + 1.50).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-4 border border-primary rounded-md bg-primary/5">
                    <input 
                      type="radio" 
                      id="card" 
                      name="payment" 
                      className="h-4 w-4 mr-3" 
                      defaultChecked 
                    />
                    <label htmlFor="card" className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Credit/Debit Card
                    </label>
                  </div>
                  
                  <div className="flex items-center p-4 border rounded-md">
                    <input 
                      type="radio" 
                      id="paypal" 
                      name="payment" 
                      className="h-4 w-4 mr-3" 
                    />
                    <label htmlFor="paypal">PayPal</label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button asChild>
                  <Link to="/bookings">Complete Payment</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MovieBooking;