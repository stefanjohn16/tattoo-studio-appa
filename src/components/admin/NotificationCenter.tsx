"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Check, X, MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications, NotificationIcon } from "@/lib/notifications";
import { format, formatDistanceToNow } from 'date-fns';

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications 
  } = useNotifications();

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 md:w-96 z-50 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="h-8 text-xs"
                  >
                    Mark all as read
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={clearAllNotifications}>
                      Clear all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <Tabs defaultValue="all">
            <div className="px-4">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">
                  Unread
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>
            <CardContent className="p-0">
              <TabsContent value="all" className="m-0">
                <NotificationList 
                  notifications={notifications} 
                  markAsRead={markAsRead}
                  removeNotification={removeNotification}
                />
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                <NotificationList 
                  notifications={notifications.filter(n => !n.read)} 
                  markAsRead={markAsRead}
                  removeNotification={removeNotification}
                />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
};

const NotificationList = ({ notifications, markAsRead, removeNotification }) => {
  if (notifications.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <p>No notifications</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="divide-y">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 flex gap-3 hover:bg-muted/50 ${!notification.read ? 'bg-muted/20' : ''}`}
          >
            <NotificationIcon type={notification.type} />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!notification.read && (
                        <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                          Mark as read
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => removeNotification(notification.id)}>
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {format(notification.timestamp, 'MMM d, yyyy h:mm a')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
