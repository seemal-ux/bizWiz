
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  isCreateAccount: boolean;
  isCaptchaVerified: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  isCreateAccount,
  isCaptchaVerified
}) => {
  return (
    <Button 
      type="submit" 
      className={`auth-btn w-full flex items-center justify-center gap-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${!isCaptchaVerified && 'opacity-50 cursor-not-allowed'} ${isLoading ? 'animate-pulse' : ''} animate-fade-in`}
      style={{animationDelay: "0.9s"}}
      disabled={isLoading || !isCaptchaVerified}
    >
      {isLoading ? (isCreateAccount ? 'Creating account...' : 'Signing in...') : (
        <>
          {isCreateAccount ? (
            <>Create account <UserPlus className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" /></>
          ) : (
            <>Sign in <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></>
          )}
        </>
      )}
    </Button>
  );
};
