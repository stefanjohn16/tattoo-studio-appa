import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationProvider } from "@/lib/notifications";
import { NotificationToastContainer } from "@/components/admin/NotificationToast";
import { NotificationCenter } from "@/components/admin/NotificationCenter";
import { CalendarView } from "@/components/admin/CalendarView";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";

const AdminDashboardLayout = ({ children }) => {
  return (
    <NotificationProvider>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Art & Ink Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <NotificationCenter />
              <Button variant="ghost" size="sm" asChild>
                <a href="/">View Website</a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="/admin/login">Logout</a>
              </Button>
            </div>
          </div>
        </header>
        
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] py-8">
          <aside className="hidden w-[200px] flex-col md:flex">
            <nav className="grid items-start gap-2">
              <Button variant="ghost" className="justify-start" asChild>
                <a href="/admin/dashboard">Dashboard</a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="/admin/dashboard/bookings">Bookings</a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="/admin/dashboard/calendar">Calendar</a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="/admin/dashboard/analytics">Analytics</a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="/admin/dashboard/artists">Artists</a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="/admin/dashboard/services">Services</a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="/admin/dashboard/block-time">Block Time</a>
              </Button>
            </nav>
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
        
        <NotificationToastContainer />
      </div>
    </NotificationProvider>
  );
};

export default AdminDashboardLayout;
