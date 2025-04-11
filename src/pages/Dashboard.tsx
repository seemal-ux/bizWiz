
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { Users, CreditCard, Activity, TrendingUp } from "lucide-react";

interface AuthUser {
  email: string;
  token: string;
  rememberMe: boolean;
  expiresAt: number;
}

const Dashboard = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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
      toast({
        title: "Session expired",
        description: "Please log in again",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    
    setUser(userData);
  }, [navigate, toast]);

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Welcome back!</h1>
        <p className="text-auth-muted">Here's what's happening with your account today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Users" 
          value="1,257"
          description="Active accounts" 
          icon={Users}
          trend="up"
          trendValue="12% from last month"
        />
        <StatCard 
          title="Revenue" 
          value="$24,780"
          description="Monthly earnings" 
          icon={CreditCard}
          trend="up"
          trendValue="8% from last month"
        />
        <StatCard 
          title="Active Sessions" 
          value="320"
          description="Currently online" 
          icon={Activity}
          trend="neutral"
          trendValue="Same as yesterday"
        />
        <StatCard 
          title="Conversion" 
          value="12.3%"
          description="From all visitors" 
          icon={TrendingUp}
          trend="down"
          trendValue="3% from last week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Account Information">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-auth-muted">Email</p>
              <p className="text-white">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-auth-muted">Session Expires</p>
              <p className="text-white">
                {new Date(user.expiresAt).toLocaleString()}
              </p>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Recent Activity">
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
                <p className="text-sm text-white">Password changed</p>
                <p className="text-xs text-auth-muted">{new Date(Date.now() - 86400000).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
              <div>
                <p className="text-sm text-white">Profile updated</p>
                <p className="text-xs text-auth-muted">{new Date(Date.now() - 172800000).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
