"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Mock services data - in a real app, this would come from Firebase
const artistServices = {
  'alex-johnson': [
    { id: 'custom-design', name: 'Custom Design', description: 'Personalized artwork created specifically for you', price: 'From $150/hour' },
    { id: 'black-gray', name: 'Black and Gray', description: 'Detailed shading work without color', price: 'From $130/hour' },
    { id: 'portrait', name: 'Portrait', description: 'Realistic portrait work', price: 'From $180/hour' }
  ],
  'sam-rivera': [
    { id: 'neo-traditional', name: 'Neo-Traditional', description: 'Bold lines with a modern color palette', price: 'From $140/hour' },
    { id: 'cover-up', name: 'Cover-Up', description: 'Transform or hide an existing tattoo', price: 'From $160/hour' },
    { id: 'american-traditional', name: 'American Traditional', description: 'Bold lines and classic designs', price: 'From $130/hour' }
  ],
  'jordan-patel': [
    { id: 'watercolor', name: 'Watercolor', description: 'Vibrant designs that mimic watercolor painting', price: 'From $150/hour' },
    { id: 'minimalist', name: 'Minimalist', description: 'Simple, clean designs with fine lines', price: 'From $120/hour' },
    { id: 'geometric', name: 'Geometric', description: 'Precise patterns and shapes', price: 'From $140/hour' }
  ]
};

export const ServiceSelection = ({ selectedArtist, selectedService, onSelect, onNext, onBack }) => {
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    if (selectedArtist) {
      setServices(artistServices[selectedArtist.id] || []);
    }
  }, [selectedArtist]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Choose Your Service</h2>
      <p className="text-muted-foreground">
        Select the type of tattoo service you'd like from {selectedArtist?.name}.
      </p>
      
      <div className="mt-6">
        <RadioGroup value={selectedService?.id} onValueChange={(value) => {
          const service = services.find(s => s.id === value);
          onSelect(service);
        }}>
          {services.map((service) => (
            <div key={service.id} className="mb-4">
              <Card className={`transition-all ${
                selectedService?.id === service.id 
                  ? 'ring-2 ring-primary' 
                  : 'hover:shadow-md'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <RadioGroupItem value={service.id} id={service.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={service.id} className="text-lg font-medium cursor-pointer">
                        {service.name}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                      <p className="text-sm font-medium mt-2">{service.price}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!selectedService}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
