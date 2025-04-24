import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { usePageViewMetrics } from '@/hooks/usePageViewMetrics';

const Terms: React.FC = () => {
  usePageViewMetrics();

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground">
                Welcome to CineBooker. These Terms of Service govern your use of our website, mobile application, and services. By accessing or using CineBooker, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Definitions</h2>
              <p className="text-muted-foreground mb-3">
                Throughout these Terms, the following definitions apply:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>"Service"</strong> refers to the CineBooker website, mobile application, and all related services.</li>
                <li><strong>"User"</strong> refers to any individual who accesses or uses the Service.</li>
                <li><strong>"Content"</strong> refers to all information displayed on the Service, including text, images, audio, video, and interactive features.</li>
                <li><strong>"Booking"</strong> refers to the reservation of cinema tickets through the Service.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
              <p className="text-muted-foreground mb-3">
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
              <p className="text-muted-foreground">
                We reserve the right to disable any user account if, in our opinion, you have violated any provision of these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Bookings and Payments</h2>
              <p className="text-muted-foreground mb-3">
                All bookings made through the Service are subject to availability. Prices for tickets and services are subject to change without notice. We reserve the right to refuse or cancel any booking at our discretion.
              </p>
              <p className="text-muted-foreground">
                Payment for bookings must be made at the time of reservation. We use third-party payment processors and do not store your payment information. Your use of these payment services is subject to their respective terms of service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Cancellations and Refunds</h2>
              <p className="text-muted-foreground">
                Bookings may be canceled or modified up to 2 hours before the scheduled showtime. Refunds will be processed to the original payment method within 5-7 business days. Cancellations made less than 2 hours before the showtime are not eligible for refunds unless otherwise required by applicable law.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Intellectual Property</h2>
              <p className="text-muted-foreground">
                The Service and its original content, features, and functionality are owned by CineBooker and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service without our prior written consent.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall CineBooker, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms, please contact us at legal@cinebooker.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Terms;