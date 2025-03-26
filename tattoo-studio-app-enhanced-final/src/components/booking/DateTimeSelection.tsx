import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { format, addDays, isBefore, startOfDay } from 'date-fns';

// Mock time slots - in a real app, these would be dynamically generated based on availability
const timeSlots = [
  { id: '10-00', time: '10:00 AM' },
  { id: '11-00', time: '11:00 AM' },
  { id: '12-00', time: '12:00 PM' },
  { id: '13-00', time: '1:00 PM' },
  { id: '14-00', time: '2:00 PM' },
  { id: '15-00', time: '3:00 PM' },
  { id: '16-00', time: '4:00 PM' },
  { id: '17-00', time: '5:00 PM' },
];

// Mock blocked dates - in a real app, these would come from Firebase
const blockedDates = [
  new Date(2025, 3, 15), // April 15, 2025
  new Date(2025, 3, 16), // April 16, 2025
  new Date(2025, 3, 22), // April 22, 2025
];

export const DateTimeSelection = ({ selectedDate, selectedTime, onSelect, onNext, onBack }) => {
  const [date, setDate] = useState(selectedDate || null);
  const [time, setTime] = useState(selectedTime || null);
  
  const today = startOfDay(new Date());
  const twoMonthsFromNow = addDays(today, 60);
  
  const isDateBlocked = (date) => {
    // Check if date is in blocked dates
    return blockedDates.some(blockedDate => 
      date.getDate() === blockedDate.getDate() && 
      date.getMonth() === blockedDate.getMonth() && 
      date.getFullYear() === blockedDate.getFullYear()
    );
  };
  
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setTime(null); // Reset time when date changes
    onSelect({ date: newDate, time: null });
  };
  
  const handleTimeChange = (timeId) => {
    const selectedTimeObj = timeSlots.find(slot => slot.id === timeId);
    setTime(selectedTimeObj);
    onSelect({ date, time: selectedTimeObj });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Select Date & Time</h2>
      <p className="text-muted-foreground">
        Choose your preferred date and time for your appointment.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Select Date</h3>
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                disabled={(date) => 
                  isBefore(date, today) || 
                  isBefore(twoMonthsFromNow, date) || 
                  isDateBlocked(date) ||
                  date.getDay() === 0 // Sundays closed
                }
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Select Time</h3>
          {date ? (
            <Card>
              <CardContent className="p-4">
                <RadioGroup value={time?.id} onValueChange={handleTimeChange}>
                  <div className="grid grid-cols-2 gap-4">
                    {timeSlots.map((slot) => (
                      <div key={slot.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={slot.id} id={slot.id} />
                        <Label htmlFor={slot.id}>{slot.time}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full border rounded-md p-8 bg-muted/50">
              <p className="text-muted-foreground">Please select a date first</p>
            </div>
          )}
        </div>
      </div>
      
      {date && time && (
        <div className="mt-6 p-4 bg-primary/10 rounded-md">
          <p className="font-medium">Your selected appointment:</p>
          <p className="text-muted-foreground">
            {format(date, 'EEEE, MMMM d, yyyy')} at {time.time}
          </p>
        </div>
      )}
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!date || !time}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
