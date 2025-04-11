
import React from "react";

interface AuthToggleProps {
  isCreateAccount: boolean;
  toggleMode: () => void;
}

export const AuthToggle: React.FC<AuthToggleProps> = ({ isCreateAccount, toggleMode }) => {
  return (
    <div className="mt-6 text-center animate-fade-in" style={{animationDelay: "1s"}}>
      <p className="text-auth-muted text-sm">
        {isCreateAccount ? "Already have an account?" : "Don't have an account?"}{" "}
        <button 
          type="button"
          onClick={toggleMode}
          className="text-burgundy hover:text-burgundy-light transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-burgundy after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:after:origin-bottom-left"
        >
          {isCreateAccount ? "Sign in" : "Create account"}
        </button>
      </p>
    </div>
  );
};
