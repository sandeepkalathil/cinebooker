import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilmIcon, Mail, ArrowLeft } from 'lucide-react';
import { usePageViewMetrics } from '@/hooks/usePageViewMetrics';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ForgotPassword: React.FC = () => {
  usePageViewMetrics();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log(`Password reset requested for: ${email}`);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <FilmIcon className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2">Reset your password</h1>
          <p className="text-muted-foreground text-center mb-8">
            Enter your email address and we'll send you a link to reset your password
          </p>
          
          {submitted ? (
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <Alert className="mb-4 bg-primary/10 border-primary/20">
                <AlertDescription>
                  If an account exists for {email}, you will receive a password reset link in your email shortly.
                </AlertDescription>
              </Alert>
              
              <p className="text-sm text-muted-foreground mb-6">
                Please check your email and follow the instructions to reset your password. The link will expire in 1 hour.
              </p>
              
              <div className="flex flex-col space-y-3">
                <Button variant="outline" className="w-full" onClick={() => setSubmitted(false)}>
                  Try another email
                </Button>
                <Button variant="ghost" className="w-full" asChild>
                  <Link to="/login" className="flex items-center justify-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to login
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  Send reset link
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <Link to="/login" className="text-sm text-primary hover:underline flex items-center justify-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ForgotPassword;