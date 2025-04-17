
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Download, Share2, Mail, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BusinessPlan } from "@/types/business-plan";
import { toast } from "sonner";

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

  const handleShare = (platform: 'gmail' | 'whatsapp') => {
    const subject = "Business Plan";
    const text = `Check out this business plan:\n\nExecutive Summary:\n${businessPlan.executiveSummary}\n\nBusiness Description:\n${businessPlan.businessDescription}`;
    
    if (platform === 'gmail') {
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      window.open(mailtoLink);
      toast.success("Opening Gmail...");
    } else if (platform === 'whatsapp') {
      const whatsappLink = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappLink);
      toast.success("Opening WhatsApp...");
    }
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleShare('gmail')}>
                <Mail className="h-4 w-4 mr-2" />
                Share via Gmail
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Share via WhatsApp
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
