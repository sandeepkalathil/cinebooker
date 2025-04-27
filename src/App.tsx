import { ThemeProvider } from "@/components/theme-provider"
import { Routes, Route } from "react-router-dom"
import Index from "@/pages/Index"
import MovieDetails from "@/pages/MovieDetails"
import MovieBooking from "@/pages/MovieBooking"
import Promotions from "@/pages/Promotions"
import ComingSoon from "@/pages/ComingSoon"
import Bookings from "@/pages/Bookings"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import ForgotPassword from "@/pages/ForgotPassword"
import Contact from "@/pages/Contact"
import Terms from "@/pages/Terms"
import Privacy from "@/pages/Privacy"
import FAQ from "@/pages/FAQ"
import Theaters from "@/pages/Theaters"
import "./App.css"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="cinebooker-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/movies/:id/booking" element={<MovieBooking />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/theaters" element={<Theaters />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
