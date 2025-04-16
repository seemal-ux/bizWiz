
import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Edit2
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface AuthUser {
  email: string;
  token: string;
  rememberMe: boolean;
  expiresAt: number;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  joinedDate: string;
  role: string;
}

const Profile = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Plaza",
    city: "San Francisco",
    country: "United States",
    joinedDate: "January 2022",
    role: "Administrator"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>({} as UserProfile);

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    
    if (!authUser) {
      return;
    }
    
    try {
      const userData: AuthUser = JSON.parse(authUser);
      setUser(userData);
      
      // Set the email from authenticated user
      setProfile(prev => ({
        ...prev,
        email: userData.email
      }));
      
      setEditedProfile(prev => ({
        ...profile,
        email: userData.email
      }));
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setIsEditing(false);
    } else {
      // Start editing - copy current profile to editable state
      setEditedProfile({...profile});
      setIsEditing(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    setProfile({...editedProfile});
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">My Profile</h1>
        <p className="text-auth-muted mt-2">View and manage your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <div className="lg:col-span-1">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader className="pb-4">
              <CardTitle>Profile Overview</CardTitle>
              <CardDescription className="text-auth-muted">Your account information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center pb-6">
              <div className="w-24 h-24 rounded-full bg-auth-accent/30 flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-auth-accent" />
              </div>
              <h3 className="text-xl font-medium text-white">{profile.firstName} {profile.lastName}</h3>
              <p className="text-auth-muted">{profile.email}</p>
              <div className="flex items-center mt-2">
                <Shield className="w-4 h-4 text-auth-accent mr-1.5" />
                <span className="text-sm text-auth-muted">{profile.role}</span>
              </div>
              <div className="flex items-center mt-1.5">
                <Calendar className="w-4 h-4 text-auth-muted mr-1.5" />
                <span className="text-sm text-auth-muted">Member since {profile.joinedDate}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details Card */}
        <div className="lg:col-span-2">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription className="text-auth-muted">Manage your personal details</CardDescription>
              </div>
              <Button 
                onClick={handleEditToggle} 
                variant="outline" 
                size="sm" 
                className="border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white"
              >
                {isEditing ? (
                  "Cancel"
                ) : (
                  <>
                    <Edit2 className="w-4 h-4 mr-1.5" />
                    Edit
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="pb-6">
              {isEditing ? (
                // Edit mode form
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={editedProfile.firstName}
                        onChange={handleInputChange}
                        className="bg-white/5 text-white border-white/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={editedProfile.lastName}
                        onChange={handleInputChange}
                        className="bg-white/5 text-white border-white/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      className="bg-white/5 text-white border-white/20"
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={editedProfile.phone}
                      onChange={handleInputChange}
                      className="bg-white/5 text-white border-white/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={editedProfile.address}
                      onChange={handleInputChange}
                      className="bg-white/5 text-white border-white/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-white">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={editedProfile.city}
                        onChange={handleInputChange}
                        className="bg-white/5 text-white border-white/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-white">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={editedProfile.country}
                        onChange={handleInputChange}
                        className="bg-white/5 text-white border-white/20"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // Read-only profile view
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <User className="w-5 h-5 text-auth-muted mr-3 mt-1" />
                      <div>
                        <p className="text-auth-muted text-sm">First Name</p>
                        <p className="text-white">{profile.firstName}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <User className="w-5 h-5 text-auth-muted mr-3 mt-1" />
                      <div>
                        <p className="text-auth-muted text-sm">Last Name</p>
                        <p className="text-white">{profile.lastName}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-auth-muted mr-3 mt-1" />
                    <div>
                      <p className="text-auth-muted text-sm">Email</p>
                      <p className="text-white">{profile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-auth-muted mr-3 mt-1" />
                    <div>
                      <p className="text-auth-muted text-sm">Phone</p>
                      <p className="text-white">{profile.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-auth-muted mr-3 mt-1" />
                    <div>
                      <p className="text-auth-muted text-sm">Address</p>
                      <p className="text-white">{profile.address}</p>
                      <p className="text-white">{profile.city}, {profile.country}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            {isEditing && (
              <CardFooter>
                <Button 
                  onClick={handleSaveProfile}
                  className="bg-auth-accent hover:bg-auth-accent/80"
                >
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
