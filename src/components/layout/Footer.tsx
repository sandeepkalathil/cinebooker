import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, MailIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log(`Subscribed with email: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-card mt-12 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CineBooker</h3>
            <p className="text-muted-foreground mb-4">
              The ultimate cinema experience with the latest blockbusters and timeless classics.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <FacebookIcon size={20} aria-hidden="true" />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <TwitterIcon size={20} aria-hidden="true" />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <InstagramIcon size={20} aria-hidden="true" />
              </a>
              <a href="https://youtube.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                <YoutubeIcon size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/theaters" className="text-muted-foreground hover:text-foreground transition-colors">
                  Theaters
                </Link>
              </li>
              <li>
                <Link to="/coming-soon" className="text-muted-foreground hover:text-foreground transition-colors">
                  Coming Soon
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="text-muted-foreground hover:text-foreground transition-colors">
                  Offers & Promotions
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for updates on new releases and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="rounded-r-none bg-muted/50 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email for newsletter"
              />
              <Button type="submit" className="rounded-l-none">
                <MailIcon size={18} aria-hidden="true" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CineBooker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
