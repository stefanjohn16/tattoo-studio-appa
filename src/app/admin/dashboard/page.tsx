import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarView } from "@/components/admin/CalendarView";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { useNotifications } from "@/lib/notifications";

export default function DashboardPage() {
  const { addNotification } = useNotifications();
  
  // Example of adding a notification when the dashboard loads
  React.useEffect(() => {
    // This would typically be triggered by real events like new bookings
    setTimeout(() => {
      addNotification(
        'info',
        'Welcome back',
        'You have 3 new bookings since your last login.'
      );
    }, 2000);
  }, [addNotification]);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Next 7 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest booking activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">Client {i}</p>
                        <p className="text-sm text-muted-foreground">Service with Artist {i}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">Today, {10 + i}:00 AM</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <a href="/admin/dashboard/bookings" className="block p-4 border rounded-md hover:bg-muted/50 text-center">
                    <p className="font-medium">New Booking</p>
                  </a>
                  <a href="/admin/dashboard/artists" className="block p-4 border rounded-md hover:bg-muted/50 text-center">
                    <p className="font-medium">Manage Artists</p>
                  </a>
                  <a href="/admin/dashboard/services" className="block p-4 border rounded-md hover:bg-muted/50 text-center">
                    <p className="font-medium">Edit Services</p>
                  </a>
                  <a href="/admin/dashboard/block-time" className="block p-4 border rounded-md hover:bg-muted/50 text-center">
                    <p className="font-medium">Block Time</p>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="calendar">
          <CalendarView />
        </TabsContent>
        
        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
