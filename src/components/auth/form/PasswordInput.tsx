
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { PasswordStrength } from "../PasswordStrength";

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isCreateAccount: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  isLoading,
  showPassword,
  setShowPassword,
  isCreateAccount
}) => {
  return (
    <div className="space-y-2 animate-fade-in" style={{animationDelay: "0.5s"}}>
      <Label htmlFor="password" className="text-sm text-gray-300">Password</Label>
      <div className="transition-all duration-200 hover:shadow-md relative">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="auth-input transition-all duration-200 border border-transparent focus:border-auth-accent pr-10"
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-auth-muted hover:text-auth-accent transition-colors"
        >
          {showPassword ? 
            <EyeOff className="h-5 w-5" aria-hidden="true" /> : 
            <Eye className="h-5 w-5" aria-hidden="true" />
          }
        </button>
      </div>
      
      {password && <PasswordStrength password={password} />}
      
      {!isCreateAccount && (
        <div className="flex justify-end">
          <Link to="/reset-password" className="text-sm text-burgundy hover:text-burgundy-light transition-colors transform hover:translate-x-1 duration-200">
            Forgot password?
          </Link>
        </div>
      )}
    </div>
  );
};
