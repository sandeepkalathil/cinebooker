import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { usePageViewMetrics } from '@/hooks/usePageViewMetrics';

const Faq: React.FC = () => {
  usePageViewMetrics();

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-2">How do I book tickets online?</AccordionTrigger>
              <AccordionContent className="px-4 pb-3 text-muted-foreground">
                Booking tickets online is simple. Browse our movie listings, select your preferred movie, choose a showtime, select your seats, and complete the payment process. Your tickets will be sent to your email.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-2">Can I cancel or change my booking?</AccordionTrigger>
              <AccordionContent className="px-4 pb-3 text-muted-foreground">
                Yes, you can cancel or modify your booking up to 2 hours before the showtime. Go to "My Bookings" section, select the booking you wish to change, and follow the instructions.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-2">What payment methods do you accept?</AccordionTrigger>
              <AccordionContent className="px-4 pb-3 text-muted-foreground">
                We accept all major credit and debit cards, PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-2">How do I get my tickets after booking?</AccordionTrigger>
              <AccordionContent className="px-4 pb-3 text-muted-foreground">
                After completing your booking, your e-tickets will be sent to your registered email address. You can also access your tickets in the "My Bookings" section of your account. Simply show the QR code at the theater entrance.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-2">Are there any booking fees?</AccordionTrigger>
              <AccordionContent className="px-4 pb-3 text-muted-foreground">
                A small convenience fee may apply to online bookings. This fee helps us maintain our online booking system and provide you with a seamless experience.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-2">What is your refund policy?</AccordionTrigger>
              <AccordionContent className="px-4 pb-3 text-muted-foreground">
                Refunds are processed within 5-7 business days to the original payment method. For cancellations made less than 2 hours before showtime, refunds may not be available as per our policy.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-2">Do you offer discounts for students or seniors?</AccordionTrigger>
              <AccordionContent className="px-4 pb-3 text-muted-foreground">
                Yes, we offer special discounts for students, seniors, and children. Valid ID may be required at the theater entrance. These discounted tickets can be purchased online or at the box office.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-2">How can I join your loyalty program?</AccordionTrigger>
              <AccordionContent className="px-4 pb-3 text-muted-foreground">
                You can join our loyalty program by creating an account on our website or app. Every booking earns you points that can be redeemed for free tickets, concessions, and exclusive offers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Faq;