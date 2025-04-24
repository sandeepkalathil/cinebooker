import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Promotion } from '@/types/cinema';
import { Calendar, Tag, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePageViewMetrics } from '@/hooks/usePageViewMetrics';

// Sample promotions data
const promotions: Promotion[] = [
  {
    id: "1",
    title: "Weekend Special: 20% Off",
    description: "Enjoy 20% off on all movie tickets booked for weekend shows. Valid for online bookings only.",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
    validFrom: "2023-10-01",
    validTo: "2023-12-31",
    discountType: "percentage",
    discountValue: 20,
    code: "WEEKEND20"
  },
  {
    id: "2",
    title: "Family Package Deal",
    description: "Book 4 or more tickets and get a free popcorn combo. Perfect for family movie outings!",
    imageUrl: "https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    validFrom: "2023-09-15",
    validTo: "2023-11-30",
    discountType: "fixed",
    discountValue: 0,
    code: "FAMILY4"
  },
  {
    id: "3",
    title: "Student Discount: $5 Off",
    description: "Students get $5 off on any movie ticket. Valid student ID required at entry.",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    validFrom: "2023-08-01",
    validTo: "2024-06-30",
    discountType: "fixed",
    discountValue: 5,
    code: "STUDENT5"
  },
  {
    id: "4",
    title: "Midweek Madness",
    description: "All tickets are 30% off on Tuesdays and Wednesdays. Limited seats available!",
    imageUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    validFrom: "2023-10-01",
    validTo: "2023-12-31",
    discountType: "percentage",
    discountValue: 30,
    code: "MIDWEEK30"
  }
];

const Promotions: React.FC = () => {
  usePageViewMetrics();

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
    console.log(`Copied code: ${code}`);
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Offers & Promotions</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {promotions.map((promo) => (
            <div key={promo.id} className="bg-card rounded-lg overflow-hidden border border-border/50 shadow-sm">
              <div className="h-48 overflow-hidden">
                <img 
                  src={promo.imageUrl} 
                  alt={promo.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{promo.title}</h2>
                
                <p className="text-muted-foreground mb-4">
                  {promo.description}
                </p>
                
                <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Valid: {promo.validFrom} to {promo.validTo}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between bg-muted/30 p-3 rounded-md mb-4">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-mono font-medium">{promo.code}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyPromoCode(promo.code)}
                    className="flex items-center"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </div>
                
                <Button variant="default" className="w-full">
                  Book Now with Offer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Promotions;