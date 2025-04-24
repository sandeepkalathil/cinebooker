import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Theater } from '@/types/cinema';
import { MapPin, Phone, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePageViewMetrics } from '@/hooks/usePageViewMetrics';

// Sample theater data
const theaters: Theater[] = [
  {
    id: "1",
    name: "CineBooker IMAX",
    location: "Downtown",
    address: "123 Main Street, Downtown, City",
    screens: 8,
    amenities: ["IMAX", "Dolby Atmos", "Recliner Seats", "VIP Lounge"],
    imageUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "2",
    name: "CineBooker Multiplex",
    location: "Westside Mall",
    address: "456 West Avenue, Westside Mall, City",
    screens: 12,
    amenities: ["4DX", "ScreenX", "Food Court", "Gaming Zone"],
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "3",
    name: "CineBooker Premiere",
    location: "Eastside",
    address: "789 East Boulevard, Eastside, City",
    screens: 6,
    amenities: ["Luxury Seating", "Dine-in Service", "Bar", "Valet Parking"],
    imageUrl: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1079&q=80"
  },
  {
    id: "4",
    name: "CineBooker Drive-In",
    location: "North Park",
    address: "101 North Park Road, Northside, City",
    screens: 3,
    amenities: ["Drive-In", "Outdoor Seating", "Food Trucks", "Pet Friendly"],
    imageUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  }
];

const Theaters: React.FC = () => {
  usePageViewMetrics();

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Theaters</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {theaters.map((theater) => (
            <div key={theater.id} className="bg-card rounded-lg overflow-hidden border border-border/50 shadow-sm">
              <div className="h-48 overflow-hidden">
                <img 
                  src={theater.imageUrl} 
                  alt={theater.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{theater.name}</h2>
                
                <div className="flex items-start mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{theater.location}</p>
                    <p className="text-muted-foreground">{theater.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <Film className="h-5 w-5 mr-2 text-primary" />
                  <p>{theater.screens} Screens</p>
                </div>
                
                <div className="mb-4">
                  <p className="font-medium mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {theater.amenities.map((amenity, index) => (
                      <span 
                        key={index} 
                        className="bg-muted/50 text-sm px-2 py-1 rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-4">
                  <Button variant="default">View Showtimes</Button>
                  <Button variant="outline">Theater Info</Button>
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

export default Theaters;