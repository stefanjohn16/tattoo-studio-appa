// src/components/sections/reviews/GoogleReviews.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function GoogleReviews() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to handle iframe load event
    const handleIframeLoad = () => {
      setIsLoaded(true);
    };

    // Function to handle iframe error
    const handleIframeError = () => {
      setError("Failed to load Google Reviews. Please try again later.");
    };

    // Add event listeners to the iframe
    const iframe = document.getElementById('google-reviews-iframe') as HTMLIFrameElement;
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
          <p className="mt-2">Please visit our <a href="https://www.google.com/viewer/place?client=ms-android-samsung-ss&sca_esv=afb5579b9aac608a&output=search&mid=/g/11gmvq5cwd&lqi=Cg1pbmsgam9ua29waW5nSOzeiqvProCACFoZEAAYABgBIg1pbmsgam9ua29waW5nMgJzdpIBGHRhdHRvb19hbmRfcGllcmNpbmdfc2hvcKoBSgoJL20vMDN5a2N2EAEqByIDaW5rKA8yHxABIhvt6NGL0vLedPcU4EDUIci3V6sn7ifrl-i34wIyERACIg1pbmsgam9ua29waW5n&phdesc=X_7fRLIPAv4&sa=X&sqi=2&ved=2ahUKEwjZzoP2o6WMAxUHFhAIHXXEMNIQkbkFegQIChAE" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Reviews page</a> to see what our clients say about us.</p>
        </div>
      ) : (
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-0 relative min-h-[600px]">
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
                  <p>Loading Google Reviews...</p>
                </div>
              </div>
            )}
            <iframe 
              id="google-reviews-iframe"
              src="https://www.google.com/viewer/place?client=ms-android-samsung-ss&sca_esv=afb5579b9aac608a&output=search&mid=/g/11gmvq5cwd&lqi=Cg1pbmsgam9ua29waW5nSOzeiqvProCACFoZEAAYABgBIg1pbmsgam9ua29waW5nMgJzdpIBGHRhdHRvb19hbmRfcGllcmNpbmdfc2hvcKoBSgoJL20vMDN5a2N2EAEqByIDaW5rKA8yHxABIhvt6NGL0vLedPcU4EDUIci3V6sn7ifrl-i34wIyERACIg1pbmsgam9ua29waW5n&phdesc=X_7fRLIPAv4&sa=X&sqi=2&ved=2ahUKEwjZzoP2o6WMAxUHFhAIHXXEMNIQkbkFegQIChAE"
              width="100%" 
              height="600" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
