"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define Service type
type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
};

export default function ServicesManagement() {
  // Mock data for services - in a real app, this would come from Firebase
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Custom Design",
      description: "Personalized tattoo design based on your ideas and preferences.",
      price: "Starts at $150"
    },
    {
      id: "2",
      name: "Cover-up",
      description: "Professional cover-up of existing tattoos with new designs.",
      price: "Starts at $200"
    },
    {
      id: "3",
      name: "Touch-up",
      description: "Refresh and enhance existing tattoos that have faded over time.",
      price: "Starts at $100"
    }
  ]);

  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState<Omit<Service, "id">>({
    name: "",
    description: "",
    price: ""
  });

  const handleAddService = () => {
    // In a real app, this would save to Firebase
    const serviceWithId = {
      ...newService,
      id: Date.now().toString()
    };
    
    setServices([...services, serviceWithId]);
    setNewService({
      name: "",
      description: "",
      price: ""
    });
    setIsAddingService(false);
  };

  const handleRemoveService = (id: string) => {
    // In a real app, this would delete from Firebase
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Services Management</h1>
        <Button onClick={() => setIsAddingService(true)}>Add New Service</Button>
      </div>

      {isAddingService ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Service</CardTitle>
            <CardDescription>Enter the details for the new service</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  placeholder="Service name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Service description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  placeholder="Starts at $100"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" onClick={() => setIsAddingService(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddService}>
                  Save Service
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>{service.description}</p>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleRemoveService(service.id)}
                    >
                      Remove Service
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
