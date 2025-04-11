
import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { AuthForm } from "@/components/auth/AuthForm";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const Index = () => {
  return (
    <AuthLayout>
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
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
