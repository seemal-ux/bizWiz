
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  isLoading: boolean;
}

export const EmailInput: React.FC<EmailInputProps> = ({ email, setEmail, isLoading }) => {
  return (
    <div className="space-y-2 animate-fade-in" style={{animationDelay: "0.4s"}}>
      <Label htmlFor="email" className="text-sm text-gray-300">Email address</Label>
      <div className="transition-all duration-200 hover:shadow-md">
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          className="auth-input transition-all duration-200 border border-transparent focus:border-auth-accent"
          required
          disabled={isLoading}
        />
      </div>
    </div>
  );
};
