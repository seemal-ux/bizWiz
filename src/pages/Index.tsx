
import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import { AuthForm } from "@/components/auth/AuthForm";
import { FileText, LayoutDashboard } from "lucide-react";

const Index = () => {
  return (
    <AuthLayout>
      <div className="absolute top-4 right-4 md:top-8 md:right-8 flex gap-2">
        <Link 
          to="/dashboard" 
          className="flex items-center px-4 py-2 bg-auth-accent/20 text-auth-accent rounded-md hover:bg-auth-accent/30 transition-all"
        >
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Dashboard
        </Link>
        <Link 
          to="/business-plan" 
          className="flex items-center px-4 py-2 bg-burgundy/20 text-burgundy rounded-md hover:bg-burgundy/30 transition-all"
        >
          <FileText className="h-4 w-4 mr-2" />
          Business Plan Generator
        </Link>
      </div>
      <AuthForm />
    </AuthLayout>
  );
};

export default Index;
