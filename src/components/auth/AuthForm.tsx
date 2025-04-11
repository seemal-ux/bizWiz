
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Lock } from "lucide-react";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    // In a real app, this would be where you'd handle authentication
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Welcome back</h1>
        <p className="text-auth-muted">Enter your credentials to access your account</p>
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
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password" className="text-sm text-gray-300">Password</Label>
            <a href="#" className="text-sm text-burgundy hover:text-burgundy-light transition-colors">Forgot password?</a>
          </div>
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
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember" 
            checked={rememberMe} 
            onCheckedChange={(checked) => setRememberMe(checked === true)}
            className="bg-dark-300 border-0 data-[state=checked]:bg-burgundy"
          />
          <Label htmlFor="remember" className="text-sm text-gray-300">Remember me for 30 days</Label>
        </div>
        
        <Button type="submit" className="auth-btn w-full flex items-center justify-center gap-2">
          Sign in <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-auth-muted text-sm">
          Don't have an account?{" "}
          <a href="#" className="text-burgundy hover:text-burgundy-light transition-colors">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
}
