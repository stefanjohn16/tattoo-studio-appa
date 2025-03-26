import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";

export const ClientInformation = ({ clientData, onUpdate, onNext, onBack }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      name: clientData.name || '',
      email: clientData.email || '',
      phone: clientData.phone || '',
      isOver18: clientData.isOver18 || false,
      notes: clientData.notes || '',
    }
  });

  const isOver18 = watch('isOver18');

  const onSubmit = (data) => {
    onUpdate({
      clientName: data.name,
      clientEmail: data.email,
      clientPhone: data.phone,
      isOver18: data.isOver18,
      notes: data.notes,
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Information</h2>
      <p className="text-muted-foreground">
        Please provide your contact details and any additional information for your booking.
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="required">Full Name</Label>
                <Input 
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Enter your full name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="required">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  placeholder="Enter your email address"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="required">Phone Number</Label>
                <Input 
                  id="phone"
                  type="tel"
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9+\-\s()]{10,15}$/,
                      message: 'Invalid phone number'
                    }
                  })}
                  placeholder="Enter your phone number"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isOver18" 
                    {...register('isOver18', { 
                      required: 'You must be 18 or older to book an appointment' 
                    })}
                  />
                  <Label htmlFor="isOver18" className="required">
                    I confirm that I am 18 years of age or older
                  </Label>
                </div>
                {errors.isOver18 && (
                  <p className="text-sm text-red-500">{errors.isOver18.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes"
                {...register('notes')}
                placeholder="Any specific details about your tattoo idea, concerns, or questions"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
          <h3 className="text-amber-800 font-medium">Important Information</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-amber-700 text-sm">
            <li>Please bring a valid photo ID to your appointment to verify your age.</li>
            <li>A deposit may be required to secure your booking.</li>
            <li>Cancellations must be made at least 48 hours in advance.</li>
          </ul>
        </div>
        
        <div className="flex justify-between mt-8">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            type="submit" 
            disabled={!isOver18}
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};
