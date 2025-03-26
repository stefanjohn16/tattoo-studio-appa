"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/lib/notifications";

export const NotificationToast = ({ notification, onClose }) => {
  const { markAsRead } = useNotifications();
  
  const handleClose = () => {
    markAsRead(notification.id);
    if (onClose) onClose();
  };
  
  // Determine background color based on notification type
  const getBgColor = () => {
    switch (notification.type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-amber-50 border-amber-200';
      case 'info': 
      default: return 'bg-blue-50 border-blue-200';
    }
  };
  
  return (
    <Card className={`w-full max-w-sm shadow-lg border ${getBgColor()} animate-in slide-in-from-right-5`}>
      <CardContent className="p-4 pb-2 flex flex-row justify-between items-start space-y-0">
        <div className="text-base font-medium">{notification.title}</div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleClose}>
          <span className="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Button>
      </CardContent>
      <CardContent className="p-4 pt-2">
        <p className="text-sm">{notification.message}</p>
        <p className="text-xs text-muted-foreground mt-2">
          {new Date(notification.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </p>
      </CardContent>
    </Card>
  );
};

export const NotificationToastContainer = () => {
  const { notifications } = useNotifications();
  const unreadNotifications = notifications.filter(n => !n.read).slice(0, 3); // Show max 3 toasts
  
  if (unreadNotifications.length === 0) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {unreadNotifications.map(notification => (
        <NotificationToast 
          key={notification.id} 
          notification={notification} 
        />
      ))}
    </div>
  );
};
