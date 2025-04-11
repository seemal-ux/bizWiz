
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Download, Share2 } from "lucide-react";
import { BusinessPlan } from "@/types/business-plan";

interface BusinessPlanOutputProps {
  businessPlan: BusinessPlan;
  onReset: () => void;
}

export function BusinessPlanOutput({ businessPlan, onReset }: BusinessPlanOutputProps) {
  const handleDownload = () => {
    // Create a blob from the business plan data
    const jsonString = JSON.stringify(businessPlan, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business-plan.json';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Business Plan</h2>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={onReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Start Over
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Card className="border-gray-600 bg-dark-400 p-6">
        <h3 className="text-xl font-semibold mb-4">Executive Summary</h3>
        <p className="text-gray-300 mb-4">{businessPlan.executiveSummary}</p>
        
        <h3 className="text-xl font-semibold mb-4 mt-6">Business Description</h3>
        <p className="text-gray-300 mb-4">{businessPlan.businessDescription}</p>
        
        <h3 className="text-xl font-semibold mb-4 mt-6">Market Analysis</h3>
        <p className="text-gray-300 mb-4">{businessPlan.marketAnalysis}</p>
        
        <h3 className="text-xl font-semibold mb-4 mt-6">Competitive Analysis</h3>
        <p className="text-gray-300 mb-4">{businessPlan.competitiveAnalysis}</p>
        
        <h3 className="text-xl font-semibold mb-4 mt-6">Marketing Strategy</h3>
        <p className="text-gray-300 mb-4">{businessPlan.marketingStrategy}</p>
        
        <h3 className="text-xl font-semibold mb-4 mt-6">Financial Projections</h3>
        <p className="text-gray-300 mb-4">{businessPlan.financialProjections}</p>
        
        <h3 className="text-xl font-semibold mb-4 mt-6">Implementation Plan</h3>
        <p className="text-gray-300 mb-4">{businessPlan.implementationPlan}</p>
      </Card>
    </div>
  );
}
