import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from "@/lib/notifications";

export default function CalendarPage() {
  const { addNotification } = useNotifications();
  
  // Example of adding a notification when calendar is exported
  const handleExportCalendar = () => {
    // This would typically trigger the actual calendar export
    setTimeout(() => {
      addNotification(
        'success',
        'Calendar Exported',
        'Your calendar has been successfully exported.'
      );
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Calendar</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Appointment Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Import and use the CalendarView component */}
            <div className="py-4">
              <iframe 
                src="/admin/dashboard" 
                className="w-full h-[800px] border-none"
                onLoad={(e) => {
                  // Navigate to the calendar tab in the iframe
                  const iframe = e.target;
                  if (iframe.contentWindow) {
                    const tabsElement = iframe.contentWindow.document.querySelector('[role="tablist"]');
                    if (tabsElement) {
                      const calendarTab = Array.from(tabsElement.children).find(
                        child => child.textContent === 'Calendar'
                      );
                      if (calendarTab) {
                        calendarTab.click();
                      }
                    }
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
