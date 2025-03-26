"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Stepper } from "@/components/ui/stepper";
import { ArtistSelection } from "@/components/booking/ArtistSelection";
import { ServiceSelection } from "@/components/booking/ServiceSelection";
import { DateTimeSelection } from "@/components/booking/DateTimeSelection";
import { ClientInformation } from "@/components/booking/ClientInformation";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";

const steps = [
  { id: 'artist', title: 'Select Artist' },
  { id: 'service', title: 'Choose Service' },
  { id: 'datetime', title: 'Select Date & Time' },
  { id: 'client', title: 'Your Information' },
  { id: 'confirm', title: 'Confirmation' },
];

const NewBookingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    artist: null,
    service: null,
    date: null,
    time: null,
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    isOver18: false,
    notes: '',
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const updateBookingData = (data) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <ArtistSelection 
          selectedArtist={bookingData.artist} 
          onSelect={(artist) => updateBookingData({ artist })}
          onNext={handleNext} 
        />;
      case 1:
        return <ServiceSelection 
          selectedArtist={bookingData.artist}
          selectedService={bookingData.service}
          onSelect={(service) => updateBookingData({ service })}
          onNext={handleNext}
          onBack={handleBack}
        />;
      case 2:
        return <DateTimeSelection 
          selectedDate={bookingData.date}
          selectedTime={bookingData.time}
          onSelect={(dateTime) => updateBookingData(dateTime)}
          onNext={handleNext}
          onBack={handleBack}
        />;
      case 3:
        return <ClientInformation 
          clientData={{
            name: bookingData.clientName,
            email: bookingData.clientEmail,
            phone: bookingData.clientPhone,
            isOver18: bookingData.isOver18,
            notes: bookingData.notes,
          }}
          onUpdate={(clientData) => updateBookingData(clientData)}
          onNext={handleNext}
          onBack={handleBack}
        />;
      case 4:
        return <BookingConfirmation 
          bookingData={bookingData}
          onBack={handleBack}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Book Your Tattoo Session</h1>
      
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Booking Process</CardTitle>
          <CardDescription>Complete the following steps to book your tattoo session</CardDescription>
        </CardHeader>
        <CardContent>
          <Stepper steps={steps} currentStep={currentStep} />
          
          <div className="mt-8">
            {renderStepContent()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewBookingPage;
