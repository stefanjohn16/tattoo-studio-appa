"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useNotifications } from "@/lib/notifications";

export default function ConfigurationPage() {
  const { addNotification } = useNotifications();
  
  // Firebase configuration state
  const [firebaseConfig, setFirebaseConfig] = useState({
    apiKey: "AIzaSyCs-Vj2ATrZCLuu_w11I4lGa2FEtJXmXx4",
    authDomain: "local-booking-7a055.firebaseapp.com",
    projectId: "local-booking-7a055",
    storageBucket: "local-booking-7a055.firebasestorage.app",
    messagingSenderId: "193767326202",
    appId: "1:193767326202:web:55c80e547a135c44b3e443"
  });
  
  // Email configuration state
  const [emailConfig, setEmailConfig] = useState({
    service: "smtp",
    host: "smtp.example.com",
    port: 587,
    secure: true,
    auth: {
      user: "user@example.com",
      pass: "password123"
    },
    from: "tattoo@example.com",
    replyTo: "info@example.com"
  });
  
  // Studio information state
  const [studioInfo, setStudioInfo] = useState({
    name: "Art & Ink Tattoo Studio",
    address: "123 Main Street, Jonkoping, Sweden",
    phone: "+46 123 456 789",
    email: "info@artandink.com",
    website: "https://www.artandink.com",
    logo: "/images/logo.png"
  });
  
  // Handle Firebase config changes
  const handleFirebaseChange = (e) => {
    const { name, value } = e.target;
    setFirebaseConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle Email config changes
  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEmailConfig(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else if (name === 'port') {
      setEmailConfig(prev => ({
        ...prev,
        [name]: parseInt(value, 10)
      }));
    } else if (name === 'secure') {
      setEmailConfig(prev => ({
        ...prev,
        [name]: e.target.checked
      }));
    } else {
      setEmailConfig(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle Studio info changes
  const handleStudioChange = (e) => {
    const { name, value } = e.target;
    setStudioInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Save configurations
  const saveConfigurations = (type) => {
    // In a real app, this would save to Firebase or local storage
    // For now, we'll just show a notification
    let message = '';
    
    switch(type) {
      case 'firebase':
        message = 'Firebase configuration saved successfully';
        // Here you would update the Firebase config in the app
        break;
      case 'email':
        message = 'Email configuration saved successfully';
        // Here you would update the email service config
        break;
      case 'studio':
        message = 'Studio information saved successfully';
        // Here you would update the studio info throughout the app
        break;
      default:
        message = 'Configuration saved successfully';
    }
    
    addNotification('success', 'Configuration Saved', message);
  };
  
  // Test email configuration
  const testEmailConfiguration = () => {
    // In a real app, this would send a test email
    // For now, we'll just show a notification
    setTimeout(() => {
      addNotification('info', 'Test Email', 'A test email has been sent to your inbox');
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configuration</h1>
      
      <Tabs defaultValue="firebase" className="space-y-4">
        <TabsList>
          <TabsTrigger value="firebase">Firebase</TabsTrigger>
          <TabsTrigger value="email">Email Service</TabsTrigger>
          <TabsTrigger value="studio">Studio Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="firebase" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Firebase Configuration</CardTitle>
              <CardDescription>
                Configure your Firebase project settings for data storage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input 
                    id="apiKey" 
                    name="apiKey" 
                    value={firebaseConfig.apiKey} 
                    onChange={handleFirebaseChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="authDomain">Auth Domain</Label>
                  <Input 
                    id="authDomain" 
                    name="authDomain" 
                    value={firebaseConfig.authDomain} 
                    onChange={handleFirebaseChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="projectId">Project ID</Label>
                  <Input 
                    id="projectId" 
                    name="projectId" 
                    value={firebaseConfig.projectId} 
                    onChange={handleFirebaseChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storageBucket">Storage Bucket</Label>
                  <Input 
                    id="storageBucket" 
                    name="storageBucket" 
                    value={firebaseConfig.storageBucket} 
                    onChange={handleFirebaseChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="messagingSenderId">Messaging Sender ID</Label>
                  <Input 
                    id="messagingSenderId" 
                    name="messagingSenderId" 
                    value={firebaseConfig.messagingSenderId} 
                    onChange={handleFirebaseChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="appId">App ID</Label>
                  <Input 
                    id="appId" 
                    name="appId" 
                    value={firebaseConfig.appId} 
                    onChange={handleFirebaseChange}
                  />
                </div>
              </div>
              
              <Button onClick={() => saveConfigurations('firebase')}>
                Save Firebase Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Service Configuration</CardTitle>
              <CardDescription>
                Configure your email service for sending booking confirmations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service">Email Service</Label>
                  <select 
                    id="service" 
                    name="service" 
                    value={emailConfig.service}
                    onChange={handleEmailChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="smtp">SMTP</option>
                    <option value="sendgrid">SendGrid</option>
                    <option value="mailgun">Mailgun</option>
                    <option value="ses">Amazon SES</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="host">SMTP Host</Label>
                  <Input 
                    id="host" 
                    name="host" 
                    value={emailConfig.host} 
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="port">SMTP Port</Label>
                  <Input 
                    id="port" 
                    name="port" 
                    type="number" 
                    value={emailConfig.port} 
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2 flex items-center justify-between">
                  <Label htmlFor="secure">Secure Connection (TLS/SSL)</Label>
                  <Switch 
                    id="secure" 
                    name="secure" 
                    checked={emailConfig.secure} 
                    onCheckedChange={(checked) => handleEmailChange({
                      target: { name: 'secure', checked }
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="auth.user">Username</Label>
                  <Input 
                    id="auth.user" 
                    name="auth.user" 
                    value={emailConfig.auth.user} 
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="auth.pass">Password</Label>
                  <Input 
                    id="auth.pass" 
                    name="auth.pass" 
                    type="password" 
                    value={emailConfig.auth.pass} 
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="from">From Email</Label>
                  <Input 
                    id="from" 
                    name="from" 
                    value={emailConfig.from} 
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="replyTo">Reply-To Email</Label>
                  <Input 
                    id="replyTo" 
                    name="replyTo" 
                    value={emailConfig.replyTo} 
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button onClick={() => saveConfigurations('email')}>
                  Save Email Configuration
                </Button>
                <Button variant="outline" onClick={testEmailConfiguration}>
                  Test Email Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="studio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Studio Information</CardTitle>
              <CardDescription>
                Configure your tattoo studio details for receipts and emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Studio Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={studioInfo.name} 
                    onChange={handleStudioChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Studio Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    value={studioInfo.email} 
                    onChange={handleStudioChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Studio Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={studioInfo.phone} 
                    onChange={handleStudioChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Studio Website</Label>
                  <Input 
                    id="website" 
                    name="website" 
                    value={studioInfo.website} 
                    onChange={handleStudioChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Studio Address</Label>
                  <Textarea 
                    id="address" 
                    name="address" 
                    value={studioInfo.address} 
                    onChange={handleStudioChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="logo">Studio Logo URL</Label>
                  <Input 
                    id="logo" 
                    name="logo" 
                    value={studioInfo.logo} 
                    onChange={handleStudioChange}
                  />
                  {studioInfo.logo && (
                    <div className="mt-2 p-2 border rounded-md inline-block">
                      <img 
                        src={studioInfo.logo} 
                        alt="Studio Logo Preview" 
                        className="h-16 w-auto object-contain"
                        onError={(e) => e.target.src = '/placeholder-logo.png'}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <Button onClick={() => saveConfigurations('studio')}>
                Save Studio Information
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
