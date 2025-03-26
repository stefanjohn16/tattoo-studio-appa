"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function InstagramEmbed() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to handle iframe load event
    const handleIframeLoad = () => {
      setIsLoaded(true);
    };

    // Function to handle iframe error
    const handleIframeError = () => {
      setError("Failed to load Instagram feed. Please try again later.");
    };

    // Add event listeners to the iframe
    const iframe = document.getElementById('instagram-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      iframe.addEventListener('error', handleIframeError);
    }

    // Cleanup function
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
        iframe.removeEventListener('error', handleIframeError);
      }
    };
  }, []);

  return (
    <div className="w-full">
      {error ? (
        <div className="text-center p-6 bg-red-50 rounded-md">
          <p className="text-red-600">{error}</p>
          <p className="mt-2">Please visit our <a href="https://www.instagram.com/artsinkjonkoping" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Instagram page</a> to see our latest work.</p>
        </div>
      ) : (
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-0 relative min-h-[750px]">
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
                  <p>Loading Instagram feed...</p>
                </div>
              </div>
            )}
            <iframe 
              id="instagram-iframe"
              src="https://www.instagram.com/artsinkjonkoping?igsh=MW4xbm1iM3RxZWgxaQ==" 
              width="100%" 
              height="750" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              className="w-full"
            ></iframe>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
