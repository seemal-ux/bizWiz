
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface ConfirmPasswordInputProps {
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  isLoading: boolean;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
}

export const ConfirmPasswordInput: React.FC<ConfirmPasswordInputProps> = ({
  confirmPassword,
  setConfirmPassword,
  isLoading,
  showConfirmPassword,
  setShowConfirmPassword
}) => {
  return (
    <div className="space-y-2 animate-fade-in" style={{animationDelay: "0.6s"}}>
      <Label htmlFor="confirmPassword" className="text-sm text-gray-300">Confirm Password</Label>
      <div className="transition-all duration-200 hover:shadow-md relative">
        <Input
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          className="auth-input transition-all duration-200 border border-transparent focus:border-auth-accent pr-10"
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-3 text-auth-muted hover:text-auth-accent transition-colors"
        >
          {showConfirmPassword ? 
            <EyeOff className="h-5 w-5" aria-hidden="true" /> : 
            <Eye className="h-5 w-5" aria-hidden="true" />
          }
        </button>
      </div>
    </div>
  );
};
