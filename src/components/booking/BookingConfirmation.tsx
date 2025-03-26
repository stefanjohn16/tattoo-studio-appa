import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from 'date-fns';
import { saveBooking, generatePdfReceipt } from "@/lib/firebase/storage";
import { Check, Download, Mail } from "lucide-react";
import { sendBookingConfirmationEmail } from "@/lib/email";

export const BookingConfirmation = ({ bookingData, onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      // Generate a unique booking ID
      const bookingId = `booking-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      // Save booking data to Firebase Cloud Storage
      await saveBooking(bookingId, bookingData);
      
      // Generate PDF receipt
      const pdfUrl = await generatePdfReceipt(bookingId, bookingData);
      
      setReceiptUrl(pdfUrl);
      setIsConfirmed(true);
    } catch (error) {
      console.error("Error confirming booking:", error);
      // Handle error state
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendEmail = async () => {
    try {
      await sendBookingConfirmationEmail(bookingData.clientEmail, bookingData, receiptUrl);
      setEmailSent(true);
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle error state
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Booking Confirmation</h2>
      <p className="text-muted-foreground">
        Please review your booking details before confirming.
      </p>
      
      {!isConfirmed ? (
        <>
          <Card className="mt-6">
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Artist & Service</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Artist:</span>
                      <span className="font-medium">{bookingData.artist?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="font-medium">{bookingData.service?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium">{bookingData.service?.price}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Date & Time</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">{format(bookingData.date, 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">{bookingData.time?.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{bookingData.clientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{bookingData.clientEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">{bookingData.clientPhone}</span>
                    </div>
                  </div>
                  
                  {bookingData.notes && (
                    <div>
                      <span className="text-muted-foreground">Additional Notes:</span>
                      <p className="mt-1">{bookingData.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <h3 className="text-amber-800 font-medium">Booking Policy</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-amber-700 text-sm">
              <li>A 20% deposit will be required to secure your booking.</li>
              <li>Cancellations must be made at least 48 hours in advance for a full deposit refund.</li>
              <li>Please arrive 15 minutes before your appointment time.</li>
              <li>Don't forget to bring a valid photo ID to verify your age.</li>
            </ul>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
              Back
            </Button>
            <Button 
              onClick={handleConfirmBooking} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
            </Button>
          </div>
        </>
      ) : (
        <div className="mt-6 space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium text-green-800">Booking Confirmed!</h3>
            <p className="mt-2 text-green-700">
              Your appointment has been successfully booked. We've sent a confirmation to your email.
            </p>
            <p className="mt-4 font-medium">
              Booking Reference: #{bookingData.clientName.split(' ')[0].toLowerCase()}-{format(new Date(), 'yyyyMMdd')}
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Next Steps</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Download Your Receipt</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Keep this for your records and bring it to your appointment.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => window.open(receiptUrl, '_blank')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Receipt
                    </Button>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Email Confirmation</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Send the booking details and receipt to your email.
                    </p>
                    {!emailSent ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={handleSendEmail}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send to Email
                      </Button>
                    ) : (
                      <p className="text-sm text-green-600 mt-2 flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Email sent to {bookingData.clientEmail}
                      </p>
                    )}
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Prepare for Your Appointment</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Check our FAQ section for tips on how to prepare for your tattoo session.
                    </p>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="mt-1 pl-0"
                      asChild
                    >
                      <a href="/#faq">View Preparation Tips</a>
                    </Button>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <div className="flex justify-center mt-8">
            <Button asChild>
              <a href="/">Return to Homepage</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
