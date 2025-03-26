import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

const BookingPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Book Your Tattoo Session</h1>
      <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
        Ready to bring your tattoo ideas to life? Book your session with our talented artists and start your journey to a unique piece of art.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>First Time Client</CardTitle>
            <CardDescription>Perfect for your first tattoo experience</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Free consultation included</li>
              <li>Detailed aftercare instructions</li>
              <li>Follow-up check-in</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/booking/new" className="w-full">
              <Button className="w-full">Book Consultation</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>Custom Design</CardTitle>
            <CardDescription>Bring your unique vision to life</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Personalized design consultation</li>
              <li>Collaborative creative process</li>
              <li>Custom artwork creation</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/booking/new" className="w-full">
              <Button className="w-full">Start Custom Design</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>Returning Client</CardTitle>
            <CardDescription>Continue your tattoo journey with us</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Priority scheduling</li>
              <li>Continuation of existing work</li>
              <li>Loyalty discounts available</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/booking/new" className="w-full">
              <Button className="w-full">Book Session</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      <div className="bg-slate-100 p-8 rounded-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">What to Expect</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Before Your Appointment</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Consultation with your artist</li>
              <li>Design approval process</li>
              <li>Deposit payment to secure your slot</li>
              <li>Pre-appointment instructions</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">On Appointment Day</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Arrive 15 minutes early</li>
              <li>Bring valid ID (must be 18+)</li>
              <li>Wear comfortable clothing</li>
              <li>Come well-rested and hydrated</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
