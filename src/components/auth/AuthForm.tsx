import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Lock, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";

interface UserData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authUser");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      if (userData.rememberMe && userData.expiresAt > Date.now()) {
        toast({
          title: "Welcome back!",
          description: `You're already logged in as ${userData.email}`,
        });
        navigate("/dashboard");
      }
    }
  }, [navigate, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isCreateAccount && password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const user = storedUsers.find((u: UserData) => u.email === email);

      if (isCreateAccount) {
        if (user) {
          toast({
            title: "Account already exists",
            description: "This email is already registered. Please sign in instead.",
            variant: "destructive",
          });
        } else {
          const newUser = { email, password, rememberMe };
          storedUsers.push(newUser);
          localStorage.setItem("users", JSON.stringify(storedUsers));
          
          authenticateUser(newUser);
          toast({
            title: "Account created",
            description: "Your account has been created and you're now logged in",
          });
        }
      } else {
        if (!user) {
          toast({
            title: "Account not found",
            description: "No account found with this email. Please create an account.",
            variant: "destructive",
          });
        } else if (user.password === password) {
          authenticateUser({ ...user, rememberMe });
          toast({
            title: "Login successful",
            description: "Welcome back!",
          });
        } else {
          toast({
            title: "Authentication failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
        }
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const authenticateUser = (userData: UserData) => {
    const authUser = {
      email: userData.email,
      rememberMe: userData.rememberMe,
      token: generateToken(),
      expiresAt: userData.rememberMe 
        ? Date.now() + (30 * 24 * 60 * 60 * 1000)
        : Date.now() + (1 * 60 * 60 * 1000)
    };
    
    localStorage.setItem("authUser", JSON.stringify(authUser));
    navigate("/dashboard");
  };

  const generateToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const toggleMode = () => {
    setIsCreateAccount(!isCreateAccount);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          {isCreateAccount ? "Create an account" : "Welcome back"}
        </h1>
        <p className="text-auth-muted">
          {isCreateAccount 
            ? "Enter your details to create your account" 
            : "Enter your credentials to access your account"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-gray-300">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-auth-muted" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="auth-input pl-10"
              required
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm text-gray-300">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-auth-muted" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="auth-input pl-10"
              required
              disabled={isLoading}
            />
          </div>
          {!isCreateAccount && (
            <div className="flex justify-end">
              <Link to="/reset-password" className="text-sm text-burgundy hover:text-burgundy-light transition-colors">
                Forgot password?
              </Link>
            </div>
          )}
        </div>
        
        {isCreateAccount && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm text-gray-300">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-auth-muted" />
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="auth-input pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember" 
            checked={rememberMe} 
            onCheckedChange={(checked) => setRememberMe(checked === true)}
            className="bg-dark-300 border-0 data-[state=checked]:bg-burgundy"
            disabled={isLoading}
          />
          <Label htmlFor="remember" className="text-sm text-gray-300">Remember me for 30 days</Label>
        </div>
        
        <Button 
          type="submit" 
          className="auth-btn w-full flex items-center justify-center gap-2" 
          disabled={isLoading}
        >
          {isLoading ? (isCreateAccount ? 'Creating account...' : 'Signing in...') : (
            <>
              {isCreateAccount ? (
                <>Create account <UserPlus className="h-4 w-4" /></>
              ) : (
                <>Sign in <ArrowRight className="h-4 w-4" /></>
              )}
            </>
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-auth-muted text-sm">
          {isCreateAccount ? "Already have an account?" : "Don't have an account?"}{" "}
          <button 
            type="button"
            onClick={toggleMode}
            className="text-burgundy hover:text-burgundy-light transition-colors"
          >
            {isCreateAccount ? "Sign in" : "Create account"}
          </button>
        </p>
      </div>
    </div>
  );
}
