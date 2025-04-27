import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Film, Calendar, Clock, Search } from 'lucide-react';
import { usePageViewMetrics } from '@/hooks/usePageViewMetrics';

// Sample theaters data
const theaters = [
{
id: "T1",
name: "CineBooker IMAX",
address: "123 Main Street, Downtown, Filmville",
image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
features: ["IMAX", "Dolby Atmos", "Recliner Seats", "Food Court"],
screens: 8,
rating: 4.8
},
{
id: "T2",
name: "CineBooker Multiplex",
address: "456 Cinema Boulevard, Westside Mall, Filmville",
image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
features: ["3D", "Dolby Sound", "Premium Seating", "Arcade"],
screens: 12,
rating: 4.5
},
{
id: "T3",
name: "CineBooker Premiere",
address: "789 Luxury Lane, Uptown, Filmville",
image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
features: ["VIP Lounge", "Gourmet Dining", "Recliner Seats", "Valet Parking"],
screens: 6,
rating: 4.9
},
{
id: "T4",
name: "CineBooker Drive-In",
address: "101 Retro Road, Outskirts, Filmville",
image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1079&q=80",
features: ["Vintage Experience", "Car Audio", "Food Delivery", "Double Features"],
screens: 3,
rating: 4.6
}
];

const Theaters: React.FC = () => {
usePageViewMetrics();
const [searchQuery, setSearchQuery] = useState('');

const filteredTheaters = theaters.filter(theater => 
theater.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
theater.address.toLowerCase().includes(searchQuery.toLowerCase())
);

return (
<>
<Navbar />
<main className="container mx-auto px-4 py-8">
<h1 className="text-3xl font-bold mb-8">Our Theaters</h1>

{/* Search Bar */}
<div className="relative max-w-md mb-8">
<Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
<Input 
type="text" 
placeholder="Search theaters by name or location" 
className="pl-10"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
</div>

{/* Theaters List */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{filteredTheaters.map((theater) => (
<div key={theater.id} className="bg-card rounded-lg overflow-hidden border border-border/50 shadow-sm">
<div className="h-48 overflow-hidden">
<img 
src={theater.image} 
alt={theater.name} 
className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
/>
</div>
<div className="p-6">
<div className="flex justify-between items-start mb-2">
<h2 className="text-2xl font-semibold">{theater.name}</h2>
<div className="flex items-center bg-primary/10 px-2 py-1 rounded text-primary">
<span className="text-sm font-medium">{theater.rating}</span>
<span className="text-xs ml-1">/ 5</span>
</div>
</div>

<div className="flex items-start mb-4">
<MapPin className="h-5 w-5 mr-2 text-muted-foreground mt-0.5 flex-shrink-0" />
<p className="text-muted-foreground">{theater.address}</p>
</div>

<div className="flex items-center space-x-4 mb-4 text-sm">
<div className="flex items-center">
<Film className="h-4 w-4 mr-1 text-muted-foreground" />
<span>{theater.screens} Screens</span>
</div>
</div>

<div className="mb-6">
<h3 className="text-sm font-medium mb-2">Features</h3>
<div className="flex flex-wrap gap-2">
{theater.features.map((feature, index) => (
<span 
key={index} 
className="bg-muted/50 text-xs px-2 py-1 rounded-full"
>
{feature}
</span>
))}
</div>
</div>

<div className="flex space-x-3">
<Button variant="default" className="flex-1">
View Showtimes
</Button>
<Button variant="outline" className="flex-1">
Theater Info
</Button>
</div>
</div>
</div>
))}
</div>

{filteredTheaters.length === 0 && (
<div className="text-center py-12">
<p className="text-xl text-muted-foreground mb-4">No theaters found matching your search.</p>
<Button variant="outline" onClick={() => setSearchQuery('')}>
Clear Search
</Button>
</div>
)}
</main>
<Footer />
</>
);
};

export default Theaters;
