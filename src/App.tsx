import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Movies from "./pages/Movies";
import Theaters from "./pages/Theaters";
import ComingSoon from "./pages/ComingSoon";
import Promotions from "./pages/Promotions";
import MovieDetails from "./pages/MovieDetails";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import MetricsEndpoint from "./pages/api/metrics";
import metricsService from "./services/metricsService";

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  useEffect(() => {
    // Record app load time
    const loadTime = performance.now() / 1000;
    metricsService.recordAppLoadTime(loadTime);
    
    // Set initial active user session
    metricsService.incrementActiveUserSessions();
    
    // Clean up when the app unmounts
    return () => {
      metricsService.decrementActiveUserSessions();
    };
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/theaters" element={<Theaters />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/promotions" element={<Promotions />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/movies/:id/booking" element={<Booking />} /> {/* Added this new route */}
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/api/metrics" element={<MetricsEndpoint />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;