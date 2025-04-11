
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-500 via-dark-400 to-dark-300">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjMUExRjJDIiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjgiLz48cGF0aCBkPSJNNTk4LjMxMSAzODRjMTEyLjMxMyAwIDIwMy4zMTEtOTAuOTk4IDIwMy4zMTEtMjAzLjMxMVM3MTAuNjI0LTIyLjYyMiA1OTguMzExLTIyLjYyMiAzOTUgNjguMzc2IDM5NSAxODAuNjg5IDQ4NS45OTggMzg0IDU5OC4zMTEgMzg0em0yNDMuMzczIDQ0LjYyMmMxMTIuMzEzIDAgMjAzLjMxMS05MC45OTggMjAzLjMxMS0yMDMuMzExUzk1My45OTcgMjIgODQxLjY4NCAyMiA2MzguMzczIDExMi45OTggNjM4LjM3MyAyMjUuMzExIDcyOS4zNzEgNDI4LjYyMiA4NDEuNjg0IDQyOC42MjJ6IiBmaWxsPSIjMjIxRjI2IiBvcGFjaXR5PSIuNSIvPjwvZz48L3N2Zz4=')] opacity-30 mix-blend-overlay pointer-events-none"></div>
      
      <header className="fixed top-0 w-full px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-auth-accent to-auth-highlight rounded-md"></div>
            <span className="font-display font-bold text-white text-xl">Auth.io</span>
          </div>
          <nav className="flex items-center">
            <Button 
              variant="outline" 
              className="text-sm text-white hover:text-gray-300 border-burgundy hover:bg-burgundy/20"
              onClick={handleLogout}
            >
              Sign out
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="auth-glass p-8 sm:p-12 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard</h1>
            <p className="text-auth-muted">Welcome to your account dashboard</p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-dark-300/50 p-4 rounded-lg">
              <p className="text-gray-300 text-sm">Logged in as:</p>
              <p className="text-white font-medium">{user.email}</p>
            </div>
            
            <div className="bg-dark-300/50 p-4 rounded-lg">
              <p className="text-gray-300 text-sm">Session expires:</p>
              <p className="text-white font-medium">
                {new Date(user.expiresAt).toLocaleString()}
              </p>
            </div>
            
            <Button 
              className="w-full auth-btn mt-4" 
              onClick={handleLogout}
            >
              Sign out
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
