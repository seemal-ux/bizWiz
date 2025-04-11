
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface RememberMeCheckboxProps {
  rememberMe: boolean;
  setRememberMe: (checked: boolean) => void;
  isLoading: boolean;
}

export const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({ 
  rememberMe, 
  setRememberMe, 
  isLoading 
}) => {
  return (
    <div className="flex items-center space-x-2 animate-fade-in" style={{animationDelay: "0.8s"}}>
      <Checkbox 
        id="remember" 
        checked={rememberMe} 
        onCheckedChange={(checked) => setRememberMe(checked === true)}
        className="bg-dark-300 border-0 data-[state=checked]:bg-burgundy transition-colors duration-200"
        disabled={isLoading}
      />
      <Label htmlFor="remember" className="text-sm text-gray-300">Remember me for 30 days</Label>
    </div>
  );
};
