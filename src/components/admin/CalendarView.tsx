"use client";

import React from 'react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, addDays, isBefore, startOfDay, isToday, isSameDay } from 'date-fns';
import { Download, Calendar, Clock } from 'lucide-react';

// Mock bookings data - in a real app, this would come from Firebase
const mockBookings = [
  {
    id: 'booking-1',
    artistId: 'alex-johnson',
    artistName: 'Alex Johnson',
    serviceId: 'custom-design',
    serviceName: 'Custom Design',
    date: new Date(2025, 3, 10, 14, 0), // April 10, 2025, 2:00 PM
    clientName: 'Emma Wilson',
    clientEmail: 'emma@example.com',
  },
  {
    id: 'booking-2',
    artistId: 'sam-rivera',
    artistName: 'Sam Rivera',
    serviceId: 'neo-traditional',
    serviceName: 'Neo-Traditional',
    date: new Date(2025, 3, 12, 11, 0), // April 12, 2025, 11:00 AM
    clientName: 'Michael Chen',
    clientEmail: 'michael@example.com',
  },
  {
    id: 'booking-3',
    artistId: 'jordan-patel',
    artistName: 'Jordan Patel',
    serviceId: 'watercolor',
    serviceName: 'Watercolor',
    date: new Date(2025, 3, 15, 16, 0), // April 15, 2025, 4:00 PM
    clientName: 'Sophia Rodriguez',
    clientEmail: 'sophia@example.com',
  }
];

// Mock blocked dates - in a real app, these would come from Firebase
const blockedDates = [
  new Date(2025, 3, 20), // April 20, 2025
  new Date(2025, 3, 21), // April 21, 2025
];

export const CalendarView = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [bookingsForDate, setBookingsForDate] = React.useState([]);
  
  React.useEffect(() => {
    if (selectedDate) {
      // Filter bookings for the selected date
      const bookings = mockBookings.filter(booking => 
        isSameDay(booking.date, selectedDate)
      );
      setBookingsForDate(bookings);
    }
  }, [selectedDate]);
  
  // Function to determine if a date has bookings
  const hasBookings = (date) => {
    return mockBookings.some(booking => isSameDay(booking.date, date));
  };
  
  // Function to determine if a date is blocked
  const isDateBlocked = (date) => {
    return blockedDates.some(blockedDate => isSameDay(date, blockedDate));
  };
  
  // Custom renderer for calendar days
  const renderDay = (day, selectedDay, dayProps) => {
    const isBookingDay = hasBookings(day);
    const isBlocked = isDateBlocked(day);
    
    return (
      <div
        {...dayProps}
        className={`${dayProps.className} relative ${
          isBookingDay ? 'font-bold' : ''
        } ${
          isBlocked ? 'bg-red-100' : ''
        }`}
      >
        {day.getDate()}
        {isBookingDay && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
        )}
      </div>
    );
  };
  
  // Function to export calendar as iCal
  const exportCalendar = () => {
    // In a real app, this would generate an iCal file with all bookings
    console.log('Exporting calendar...');
    alert('Calendar exported successfully!');
  };
  
  // Function to export to Google Calendar
  const exportToGoogleCalendar = () => {
    // In a real app, this would generate a Google Calendar link
    console.log('Exporting to Google Calendar...');
    alert('Calendar exported to Google Calendar!');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Appointment Calendar</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCalendar}>
            <Download className="h-4 w-4 mr-2" />
            Export iCal
          </Button>
          <Button variant="outline" size="sm" onClick={exportToGoogleCalendar}>
            <Calendar className="h-4 w-4 mr-2" />
            Google Calendar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              components={{
                Day: ({ day, selectedDay, ...dayProps }) => 
                  renderDay(day, selectedDay, dayProps)
              }}
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                <span>Bookings</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 rounded-full bg-red-100 mr-2"></div>
                <span>Blocked Dates</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bookingsForDate.length > 0 ? (
              <div className="space-y-4">
                {bookingsForDate.map(booking => (
                  <div key={booking.id} className="p-4 border rounded-md hover:bg-muted/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{booking.clientName}</h3>
                        <p className="text-sm text-muted-foreground">{booking.serviceName} with {booking.artistName}</p>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {format(booking.date, 'h:mm a')}
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm">{booking.clientEmail}</span>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : isDateBlocked(selectedDate) ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">This date is blocked</p>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No bookings for this date</p>
                <Button variant="outline" className="mt-4">
                  Add Booking
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
