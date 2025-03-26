import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from "@/lib/notifications";

export default function AnalyticsPage() {
  const { addNotification } = useNotifications();
  
  // Example of adding a notification when analytics report is generated
  const handleGenerateReport = () => {
    // This would typically trigger the actual report generation
    setTimeout(() => {
      addNotification(
        'success',
        'Report Generated',
        'Your analytics report has been successfully generated and is ready for download.'
      );
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Import and use the AnalyticsDashboard component */}
            <div className="py-4">
              <iframe 
                src="/admin/dashboard" 
                className="w-full h-[800px] border-none"
                onLoad={(e) => {
                  // Navigate to the analytics tab in the iframe
                  const iframe = e.target;
                  if (iframe.contentWindow) {
                    const tabsElement = iframe.contentWindow.document.querySelector('[role="tablist"]');
                    if (tabsElement) {
                      const analyticsTab = Array.from(tabsElement.children).find(
                        child => child.textContent === 'Analytics'
                      );
                      if (analyticsTab) {
                        analyticsTab.click();
                      }
                    }
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
