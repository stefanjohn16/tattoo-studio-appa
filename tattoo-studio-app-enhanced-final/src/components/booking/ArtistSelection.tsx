import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const artists = [
  {
    id: 'alex-johnson',
    name: 'Alex Johnson',
    specialties: 'Custom Design, Black and Gray',
    experience: '8 years',
    image: '/images/artist-alex.jpg',
    bio: 'Alex specializes in custom black and gray designs with fine line work and attention to detail.'
  },
  {
    id: 'sam-rivera',
    name: 'Sam Rivera',
    specialties: 'Neo-Traditional, Cover-ups',
    experience: '6 years',
    image: '/images/artist-sam.jpg',
    bio: 'Sam brings a modern twist to traditional tattoo styles and excels at transforming old tattoos into new art.'
  },
  {
    id: 'jordan-patel',
    name: 'Jordan Patel',
    specialties: 'Watercolor, Minimalist',
    experience: '5 years',
    image: '/images/artist-jordan.jpg',
    bio: 'Jordan creates vibrant watercolor pieces and elegant minimalist designs that tell a story.'
  }
];

export const ArtistSelection = ({ selectedArtist, onSelect, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Select Your Artist</h2>
      <p className="text-muted-foreground">
        Choose the artist you'd like to work with for your tattoo. Each artist has their own unique style and specialties.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {artists.map((artist) => (
          <Card 
            key={artist.id}
            className={`cursor-pointer transition-all ${
              selectedArtist?.id === artist.id 
                ? 'ring-2 ring-primary shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => onSelect(artist)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={artist.image} alt={artist.name} />
                  <AvatarFallback>{artist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{artist.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">Specializes in: {artist.specialties}</p>
                <p className="text-sm text-muted-foreground mb-4">{artist.experience} of experience</p>
                <p className="text-sm">{artist.bio}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-end mt-8">
        <Button 
          onClick={onNext} 
          disabled={!selectedArtist}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
