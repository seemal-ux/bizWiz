
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CircleX, CircleMinus, CircleCheck, Shield } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  // Calculate password strength
  const calculateStrength = (password: string): { 
    strength: number; 
    label: string; 
    color: string;
    suggestions: string[];
    icon: React.ReactNode;
  } => {
    if (!password) {
      return { 
        strength: 0, 
        label: "Empty", 
        color: "bg-gray-500",
        suggestions: ["Enter a password"],
        icon: <Shield className="h-4 w-4 text-gray-500" />
      };
    }

    let strength = 0;
    const suggestions: string[] = [];

    // Length check
    if (password.length < 8) {
      suggestions.push("Use at least 8 characters");
    } else {
      strength += 20;
    }

    // Check for numbers
    if (!/\d/.test(password)) {
      suggestions.push("Add numbers");
    } else {
      strength += 20;
    }

    // Check for lowercase
    if (!/[a-z]/.test(password)) {
      suggestions.push("Add lowercase letters");
    } else {
      strength += 20;
    }

    // Check for uppercase
    if (!/[A-Z]/.test(password)) {
      suggestions.push("Add uppercase letters");
    } else {
      strength += 20;
    }

    // Check for special chars
    if (!/[^A-Za-z0-9]/.test(password)) {
      suggestions.push("Add special characters (!@#$%^&*)");
    } else {
      strength += 20;
    }

    // Determine label and color
    let label: string;
    let color: string;
    let icon: React.ReactNode;

    if (strength < 40) {
      label = "Weak";
      color = "bg-red-500";
      icon = <CircleX className="h-4 w-4 text-red-500" />;
    } else if (strength < 80) {
      label = "Average";
      color = "bg-yellow-500";
      icon = <CircleMinus className="h-4 w-4 text-yellow-500" />;
    } else {
      label = "Strong";
      color = "bg-green-500";
      icon = <CircleCheck className="h-4 w-4 text-green-500" />;
      if (suggestions.length === 0) {
        suggestions.push("Great password!");
      }
    }

    return { strength, label, color, suggestions, icon };
  };

  const { strength, label, color, suggestions, icon } = calculateStrength(password);

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          {icon}
          <span className="text-xs font-medium">{label} password</span>
        </div>
        <Badge 
          variant="outline"
          className={`text-xs ${
            label === "Weak" ? "text-red-500 border-red-500" : 
            label === "Average" ? "text-yellow-500 border-yellow-500" : 
            "text-green-500 border-green-500"
          }`}
        >
          {strength}%
        </Badge>
      </div>
      
      <Progress 
        value={strength} 
        className="h-1" 
        indicatorClassName={color} 
      />
      
      {suggestions.length > 0 && (
        <ul className="text-xs text-auth-muted pl-1 mt-1 space-y-0.5">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-center gap-1">
              <span className="text-[10px]">•</span> {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
