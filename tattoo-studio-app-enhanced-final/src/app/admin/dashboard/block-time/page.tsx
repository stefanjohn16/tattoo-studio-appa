"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";

// Define BlockedTime type
type BlockedTime = {
  id: string;
  date: Date;
  reason: string;
};

export default function BlockTimeManagement() {
  // Mock data for blocked times - in a real app, this would come from Firebase
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([
    {
      id: "1",
      date: new Date(2025, 3, 30), // April 30, 2025
      reason: "Studio Maintenance"
    },
    {
      id: "2",
      date: new Date(2025, 4, 1), // May 1, 2025
      reason: "Public Holiday"
    }
  ]);

  const [isAddingBlockedTime, setIsAddingBlockedTime] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [blockReason, setBlockReason] = useState("");

  const handleAddBlockedTime = () => {
    if (!selectedDate) return;
    
    // In a real app, this would save to Firebase
    const blockedTimeWithId = {
      id: Date.now().toString(),
      date: selectedDate,
      reason: blockReason || "Unavailable"
    };
    
    setBlockedTimes([...blockedTimes, blockedTimeWithId]);
    setSelectedDate(undefined);
    setBlockReason("");
    setIsAddingBlockedTime(false);
  };

  const handleRemoveBlockedTime = (id: string) => {
    // In a real app, this would delete from Firebase
    setBlockedTimes(blockedTimes.filter(time => time.id !== id));
  };

  // Function to check if a date is already blocked
  const isDateBlocked = (date: Date) => {
    return blockedTimes.some(blockedTime => 
      blockedTime.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Block Time Management</h1>
        <Button onClick={() => setIsAddingBlockedTime(true)}>Block New Date</Button>
      </div>

      {isAddingBlockedTime ? (
        <Card>
          <CardHeader>
            <CardTitle>Block New Date</CardTitle>
            <CardDescription>Select a date to block for appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="block mb-2">Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => 
                    date < new Date() || // Can't block dates in the past
                    isDateBlocked(date)  // Can't block already blocked dates
                  }
                  className="border rounded-md p-3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason (Optional)</Label>
                <input
                  id="reason"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  placeholder="e.g., Holiday, Maintenance"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" onClick={() => setIsAddingBlockedTime(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddBlockedTime}
                  disabled={!selectedDate}
                >
                  Block Date
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blockedTimes.map((blockedTime) => (
            <Card key={blockedTime.id}>
              <CardHeader>
                <CardTitle>{blockedTime.date.toLocaleDateString()}</CardTitle>
                <CardDescription>Blocked Date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p><strong>Reason:</strong> {blockedTime.reason}</p>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleRemoveBlockedTime(blockedTime.id)}
                    >
                      Unblock Date
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
