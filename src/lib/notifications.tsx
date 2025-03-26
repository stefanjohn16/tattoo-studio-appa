"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Bell, Check, X } from 'lucide-react';

// Notification types
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

// Notification interface
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

// Context interface
interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (type: NotificationType, title: string, message: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

// Create context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Update unread count when notifications change
  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Add a new notification
  const addNotification = (type: NotificationType, title: string, message: string) => {
    const newNotification: Notification = {
      id: `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type,
      title,
      message,
      timestamp: new Date(),
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Remove a notification
  const removeNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Notification icon component based on type
export const NotificationIcon: React.FC<{ type: NotificationType }> = ({ type }) => {
  switch (type) {
    case 'success':
      return <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><Check className="h-5 w-5" /></div>;
    case 'error':
      return <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600"><X className="h-5 w-5" /></div>;
    case 'warning':
      return <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"><Bell className="h-5 w-5" /></div>;
    case 'info':
    default:
      return <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Bell className="h-5 w-5" /></div>;
  }
};
