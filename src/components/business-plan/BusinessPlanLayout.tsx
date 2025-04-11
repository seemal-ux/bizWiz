
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BusinessPlanLayoutProps {
  children: React.ReactNode;
}

export function BusinessPlanLayout({ children }: BusinessPlanLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-500 to-dark-700 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-burgundy hover:text-burgundy-light transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-2 text-center">AI Business Plan Generator</h1>
          <p className="text-gray-400 mb-8 text-center max-w-2xl">
            Upload your PDF or Word document and our AI will analyze it to create a comprehensive business plan tailored to your needs.
          </p>
          
          <div className="w-full max-w-3xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
