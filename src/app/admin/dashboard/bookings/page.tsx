"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { saveBooking, BookingData } from "@/lib/firebase/storage";

// Define types for the booking process
type Artist = {
  id: string;
  name: string;
  services: Service[];
};

type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
};

type BookingFormData = {
  artistId: string;
  artistName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  isOver18: boolean;
};

// Mock data for artists and services
const MOCK_ARTISTS: Artist[] = [
  {
    id: "1",
    name: "Alex Johnson",
    services: [
      {
        id: "101",
        name: "Custom Design",
        description: "Personalized tattoo design based on your ideas and preferences.",
        price: "Starts at $150"
      },
      {
        id: "102",
        name: "Black and Gray",
        description: "Stunning black and gray tattoos with detailed shading.",
        price: "Starts at $120"
      }
    ]
  },
  {
    id: "2",
    name: "Sam Rivera",
    services: [
      {
        id: "201",
        name: "Neo-Traditional",
        description: "Bold lines and vibrant colors in a neo-traditional style.",
        price: "Starts at $180"
      },
      {
        id: "202",
        name: "Cover-ups",
        description: "Professional cover-up of existing tattoos with new designs.",
        price: "Starts at $200"
      }
    ]
  }
];

// Available time slots
const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", 
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

export default function BookingsManagement() {
  // State for the multi-step booking process
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingFormData>({
    artistId: "",
    artistName: "",
    serviceId: "",
    serviceName: "",
    date: "",
    time: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    isOver18: false
  });
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  // Handle artist selection
  const handleSelectArtist = (artist: Artist) => {
    setSelectedArtist(artist);
    setBookingData({
      ...bookingData,
      artistId: artist.id,
      artistName: artist.name
    });
    setCurrentStep(2);
  };

  // Handle service selection
  const handleSelectService = (service: Service) => {
    setBookingData({
      ...bookingData,
      serviceId: service.id,
      serviceName: service.name
    });
    setCurrentStep(3);
  };

  // Handle date selection
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData({
      ...bookingData,
      date: e.target.value
    });
  };

  // Handle time selection
  const handleTimeChange = (time: string) => {
    setBookingData({
      ...bookingData,
      time
    });
    setCurrentStep(4);
  };

  // Handle client information and age verification
  const handleClientInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(5);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBookingData({
      ...bookingData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Handle booking confirmation
  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    
    try {
      // Save booking to Firebase Cloud Storage
      const savedBooking = await saveBooking(bookingData);
      setBookingId(savedBooking.id);
      setBookingComplete(true);
      setCurrentStep(6);
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("There was an error saving your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate PDF receipt
  const handleGenerateReceipt = () => {
    // In a real app, this would generate a PDF using jsPDF or similar
    alert(`Receipt for booking ${bookingId} would be generated here.
Client: ${bookingData.clientName}
Email: ${bookingData.clientEmail}
Artist: ${bookingData.artistName}
Service: ${bookingData.serviceName}
Date: ${bookingData.date}
Time: ${bookingData.time}`);
  };

  // Reset booking form
  const handleNewBooking = () => {
    setCurrentStep(1);
    setSelectedArtist(null);
    setBookingData({
      artistId: "",
      artistName: "",
      serviceId: "",
      serviceName: "",
      date: "",
      time: "",
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      isOver18: false
    });
    setBookingComplete(false);
    setBookingId(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Booking Management</h1>
      
      {/* Step indicator */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <div 
            key={step} 
            className={`flex flex-col items-center ${currentStep >= step ? "text-slate-900" : "text-slate-400"}`}
          >
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep === step 
                  ? "bg-slate-900 text-white" 
                  : currentStep > step 
                    ? "bg-slate-200 text-slate-900" 
                    : "bg-slate-100 text-slate-400"
              }`}
            >
              {step}
            </div>
            <span className="text-sm">
              {step === 1 && "Artist"}
              {step === 2 && "Service"}
              {step === 3 && "Date & Time"}
              {step === 4 && "Client Info"}
              {step === 5 && "Confirm"}
              {step === 6 && "Receipt"}
            </span>
          </div>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && "Select an Artist"}
            {currentStep === 2 && "Select a Service"}
            {currentStep === 3 && "Choose Date and Time"}
            {currentStep === 4 && "Enter Your Information"}
            {currentStep === 5 && "Confirm Your Booking"}
            {currentStep === 6 && "Booking Confirmed"}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Choose the artist you'd like to work with"}
            {currentStep === 2 && "Select the service you're interested in"}
            {currentStep === 3 && "Pick a date and time for your appointment"}
            {currentStep === 4 && "Provide your contact details"}
            {currentStep === 5 && "Review and confirm your booking details"}
            {currentStep === 6 && "Your booking has been confirmed"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Step 1: Artist Selection */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_ARTISTS.map((artist) => (
                <Card 
                  key={artist.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleSelectArtist(artist)}
                >
                  <CardHeader>
                    <CardTitle>{artist.name}</CardTitle>
                    <CardDescription>Tattoo Artist</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Specializes in: {artist.services.map(s => s.name).join(", ")}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Step 2: Service Selection */}
          {currentStep === 2 && selectedArtist && (
            <div className="space-y-4">
              <p className="mb-4">Selected Artist: <strong>{selectedArtist.name}</strong></p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedArtist.services.map((service) => (
                  <Card 
                    key={service.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleSelectService(service)}
                  >
                    <CardHeader>
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription>{service.price}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back to Artist Selection
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Date and Time Selection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="date" className="block font-medium">
                  Select Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              {bookingData.date && (
                <div className="space-y-2">
                  <label className="block font-medium">
                    Select Time
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {TIME_SLOTS.map((time) => (
                      <Button
                        key={time}
                        variant={bookingData.time === time ? "default" : "outline"}
                        onClick={() => handleTimeChange(time)}
                        className="w-full"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep(4)} 
                  disabled={!bookingData.date || !bookingData.time}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Client Information */}
          {currentStep === 4 && (
            <form onSubmit={handleClientInfoSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="clientName" className="block font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={bookingData.clientName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="clientEmail" className="block font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="clientEmail"
                  name="clientEmail"
                  value={bookingData.clientEmail}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="clientPhone" className="block font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="clientPhone"
                  name="clientPhone"
                  value={bookingData.clientPhone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isOver18"
                  name="isOver18"
                  checked={bookingData.isOver18}
                  onChange={handleInputChange}
                  className="h-4 w-4"
                  required
                />
                <label htmlFor="isOver18" className="font-medium">
                  I confirm that I am 18 years or older
                </label>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(3)}>
                  Back
                </Button>
                <Button 
                  type="submit" 
                  disabled={!bookingData.clientName || !bookingData.clientEmail || !bookingData.clientPhone || !bookingData.isOver18}
                >
                  Next
                </Button>
              </div>
            </form>
          )}

          {/* Step 5: Booking Confirmation */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-md">
                <h3 className="font-bold text-lg mb-2">Booking Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>Artist:</strong> {bookingData.artistName}</p>
                    <p><strong>Service:</strong> {bookingData.serviceName}</p>
                    <p><strong>Date:</strong> {new Date(bookingData.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {bookingData.time}</p>
                  </div>
                  <div>
                    <p><strong>Name:</strong> {bookingData.clientName}</p>
                    <p><strong>Email:</strong> {bookingData.clientEmail}</p>
                    <p><strong>Phone:</strong> {bookingData.clientPhone}</p>
                    <p><strong>Age Verification:</strong> {bookingData.isOver18 ? "Confirmed 18+" : "Not Verified"}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setCurrentStep(4)}>
                  Back
                </Button>
                <Button 
                  onClick={handleConfirmBooking} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </Button>
              </div>
            </div>
          )}

          {/* Step 6: Booking Complete */}
          {currentStep === 6 && bookingComplete && (
            <div className="space-y-6 text-center">
              <div className="py-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
                <p className="text-slate-600 mb-4">
                  Your booking has been successfully confirmed. A confirmation email will be sent to {bookingData.clientEmail}.
                </p>
                <p className="font-medium">Booking ID: {bookingId}</p>
              </div>
              
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Button onClick={handleGenerateReceipt}>
                  Generate Receipt
                </Button>
                <Button variant="outline" onClick={handleNewBooking}>
                  Create New Booking
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
