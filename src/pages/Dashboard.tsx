
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { FileUpload } from "@/components/dashboard/FileUpload";
import { N8nConfig } from "@/components/dashboard/N8nConfig";
import { Users, CreditCard, Activity, TrendingUp, Lightbulb } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface AuthUser {
  email: string;
  token: string;
  rememberMe: boolean;
  expiresAt: number;
}

const Dashboard = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [showIdeaDialog, setShowIdeaDialog] = useState(false);
  const navigate = useNavigate();
  const { toast: useToastFn } = useToast();

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    
    if (!authUser) {
      navigate("/");
      return;
    }
    
    const userData: AuthUser = JSON.parse(authUser);
    
    // Check if token has expired
    if (userData.expiresAt < Date.now()) {
      localStorage.removeItem("authUser");
      useToastFn({
        title: "Session expired",
        description: "Please log in again",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    
    setUser(userData);
  }, [navigate, useToastFn]);

  const handleGenerateQuickIdea = () => {
    const ideas = [
      "Mobile app for tracking local farmers markets",
      "Online platform connecting seniors with tech support",
      "Subscription service for eco-friendly office supplies",
      "AI-powered personal finance advisor for freelancers",
      "Community-based tool sharing platform"
    ];
    
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    toast.success(`Quick idea: ${randomIdea}`);
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">Welcome back!</h1>
        <p className="text-auth-muted mt-2">Here's what's happening with your account today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Users" 
          value="1,257"
          description="Active accounts" 
          icon={Users}
          trend="up"
          trendValue="12% from last month"
          className="animate-fade-in" 
          style={{ animationDelay: '0.1s' }}
        />
        <StatCard 
          title="Revenue" 
          value="$24,780"
          description="Monthly earnings" 
          icon={CreditCard}
          trend="up"
          trendValue="8% from last month"
          className="animate-fade-in" 
          style={{ animationDelay: '0.2s' }}
        />
        <StatCard 
          title="Active Sessions" 
          value="320"
          description="Currently online" 
          icon={Activity}
          trend="neutral"
          trendValue="Same as yesterday"
          className="animate-fade-in" 
          style={{ animationDelay: '0.3s' }}
        />
        <StatCard 
          title="Generate Idea" 
          value="Quick Idea"
          description="Get instant business concept" 
          icon={Lightbulb}
          className="animate-fade-in" 
          style={{ animationDelay: '0.4s', borderColor: 'rgba(249, 115, 22, 0.2)' }}
          onClick={handleGenerateQuickIdea}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <FileUpload />
          </div>
        </div>

        <div className="space-y-6">
          <N8nConfig />
          
          <DashboardCard 
            title="Recent Activity" 
            className="animate-fade-in" 
            style={{ animationDelay: '0.7s' }}
          >
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                <div>
                  <p className="text-sm text-white">Successful login</p>
                  <p className="text-xs text-auth-muted">{new Date().toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                <div>
                  <p className="text-sm text-white">File uploaded</p>
                  <p className="text-xs text-auth-muted">{new Date(Date.now() - 3600000).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                <div>
                  <p className="text-sm text-white">Business idea generated</p>
                  <p className="text-xs text-auth-muted">{new Date(Date.now() - 172800000).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
      
      <Dialog open={showIdeaDialog} onOpenChange={setShowIdeaDialog}>
        <DialogContent className="bg-dark-400 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Business Idea Generator</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300">Configure your n8n workflow to generate business ideas.</p>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Dashboard;
