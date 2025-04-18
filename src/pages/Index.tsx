
import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { AuthForm } from "@/components/auth/AuthForm";
import { FileUploader } from "@/components/business-plan/FileUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <AuthLayout>
      <Tabs defaultValue="auth" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="auth">Sign In / Register</TabsTrigger>
          <TabsTrigger value="upload">Business Plan Generator</TabsTrigger>
        </TabsList>
        <TabsContent value="auth">
          <AuthForm />
        </TabsContent>
        <TabsContent value="upload">
          <FileUploader />
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
};

export default Index;
