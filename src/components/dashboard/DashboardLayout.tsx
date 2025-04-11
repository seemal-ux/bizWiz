
import React, { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader,
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LayoutDashboard, FileText, Settings, LogOut, User, Home } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-500 via-dark-400 to-dark-300">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjMUExRjJDIiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjgiLz48cGF0aCBkPSJNNTk4LjMxMSAzODRjMTEyLjMxMyAwIDIwMy4zMTEtOTAuOTk4IDIwMy4zMTEtMjAzLjMxMVM3MTAuNjI0LTIyLjYyMiA1OTguMzExLTIyLjYyMiAzOTUgNjguMzc2IDM5NSAxODAuNjg5IDQ4NS45OTggMzg0IDU5OC4zMTEgMzg0em0yNDMuMzczIDQ0LjYyMmMxMTIuMzEzIDAgMjAzLjMxMS05MC45OTggMjAzLjMxMS0yMDMuMzExUzk1My45OTcgMjIgODQxLjY4NCAyMiA2MzguMzczIDExMi45OTggNjM4LjM3MyAyMjUuMzExIDcyOS4zNzEgNDI4LjYyMiA4NDEuNjg0IDQyOC42MjJ6IiBmaWxsPSIjMjIxRjI2IiBvcGFjaXR5PSIuNSIvPjwvZz48L3N2Zz4=')] opacity-30 mix-blend-overlay pointer-events-none"></div>

      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <Sidebar>
            <SidebarHeader className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-br from-auth-accent to-auth-highlight rounded-md"></div>
                <span className="font-display font-bold text-white text-xl">Auth.io</span>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Home">
                        <Link to="/home">
                          <Home />
                          <span>Home</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Dashboard">
                        <Link to="/dashboard">
                          <LayoutDashboard />
                          <span>Dashboard</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Business Plan">
                        <Link to="/business-plan">
                          <FileText />
                          <span>Business Plan</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarSeparator />
              
              <SidebarGroup>
                <SidebarGroupLabel>Account</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Profile">
                        <Link to="#">
                          <User />
                          <span>Profile</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Settings">
                        <Link to="#">
                          <Settings />
                          <span>Settings</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Logout" onClick={handleLogout}>
                        <LogOut />
                        <span>Logout</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className="p-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-auth-muted">
                  <p>Auth.io Dashboard</p>
                  <p className="text-xs opacity-70">v1.0.0</p>
                </div>
                <SidebarTrigger />
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <div className="h-14 border-b px-6 flex items-center justify-between">
              <div className="flex items-center">
                <SidebarTrigger className="mr-3" />
                <h1 className="text-lg font-semibold">Dashboard</h1>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Sign out
              </Button>
            </div>
            <div className="p-6">
              {children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};
