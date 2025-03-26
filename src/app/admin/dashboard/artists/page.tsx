"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Define Artist type
type Artist = {
  id: string;
  name: string;
  bio: string;
  profileImage: string;
  services: string[];
};

export default function ArtistsManagement() {
  // Mock data for artists - in a real app, this would come from Firebase
  const [artists, setArtists] = useState<Artist[]>([
    {
      id: "1",
      name: "Alex Johnson",
      bio: "Specializes in black and gray realism with 8 years of experience.",
      profileImage: "/images/artist1.jpg",
      services: ["Custom Design", "Black and Gray", "Realism"]
    },
    {
      id: "2",
      name: "Sam Rivera",
      bio: "Expert in colorful neo-traditional designs with 5 years of experience.",
      profileImage: "/images/artist2.jpg",
      services: ["Neo-Traditional", "Color Work", "Cover-ups"]
    }
  ]);

  const [isAddingArtist, setIsAddingArtist] = useState(false);
  const [newArtist, setNewArtist] = useState<Omit<Artist, "id">>({
    name: "",
    bio: "",
    profileImage: "",
    services: []
  });
  const [newService, setNewService] = useState("");

  const handleAddArtist = () => {
    // In a real app, this would save to Firebase
    const artistWithId = {
      ...newArtist,
      id: Date.now().toString()
    };
    
    setArtists([...artists, artistWithId]);
    setNewArtist({
      name: "",
      bio: "",
      profileImage: "",
      services: []
    });
    setIsAddingArtist(false);
  };

  const handleAddService = () => {
    if (newService.trim()) {
      setNewArtist({
        ...newArtist,
        services: [...newArtist.services, newService.trim()]
      });
      setNewService("");
    }
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = [...newArtist.services];
    updatedServices.splice(index, 1);
    setNewArtist({
      ...newArtist,
      services: updatedServices
    });
  };

  const handleRemoveArtist = (id: string) => {
    // In a real app, this would delete from Firebase
    setArtists(artists.filter(artist => artist.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Artists Management</h1>
        <Button onClick={() => setIsAddingArtist(true)}>Add New Artist</Button>
      </div>

      {isAddingArtist ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Artist</CardTitle>
            <CardDescription>Enter the details for the new artist</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newArtist.name}
                  onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
                  placeholder="Artist name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={newArtist.bio}
                  onChange={(e) => setNewArtist({ ...newArtist, bio: e.target.value })}
                  placeholder="Artist biography"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image URL</Label>
                <Input
                  id="profileImage"
                  value={newArtist.profileImage}
                  onChange={(e) => setNewArtist({ ...newArtist, profileImage: e.target.value })}
                  placeholder="/images/artist.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label>Services</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    placeholder="Add a service"
                  />
                  <Button type="button" onClick={handleAddService}>Add</Button>
                </div>
                
                {newArtist.services.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-2">Current Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {newArtist.services.map((service, index) => (
                        <div key={index} className="bg-slate-100 px-3 py-1 rounded-full flex items-center">
                          <span>{service}</span>
                          <button
                            type="button"
                            className="ml-2 text-slate-500 hover:text-slate-700"
                            onClick={() => handleRemoveService(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" onClick={() => setIsAddingArtist(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddArtist}>
                  Save Artist
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {artists.map((artist) => (
            <Card key={artist.id}>
              <CardHeader>
                <CardTitle>{artist.name}</CardTitle>
                <CardDescription>Artist Profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>{artist.bio}</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {artist.services.map((service, index) => (
                        <span key={index} className="bg-slate-100 px-3 py-1 rounded-full text-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleRemoveArtist(artist.id)}
                    >
                      Remove Artist
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
