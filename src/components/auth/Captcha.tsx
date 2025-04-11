
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface CaptchaProps {
  onVerify: (verified: boolean) => void;
}

export function Captcha({ onVerify }: CaptchaProps) {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const generateCaptcha = () => {
    setIsRefreshing(true);
    
    // Generate an alphanumeric CAPTCHA that always starts with an uppercase letter
    const uppercaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const otherChars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    
    // Start with an uppercase letter
    let result = uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    
    // Add remaining characters
    const length = 5; // One less because we already added the first uppercase letter
    for (let i = 0; i < length; i++) {
      result += otherChars.charAt(Math.floor(Math.random() * otherChars.length));
    }
    
    setCaptchaText(result);
    setUserInput("");
    setIsVerified(false);
    onVerify(false);
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 300);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    const verified = userInput === captchaText;
    setIsVerified(verified);
    onVerify(verified);
  };

  return (
    <div className="space-y-3 transition-all duration-300">
      <div className="flex flex-col space-y-2">
        <div className="text-sm font-medium text-gray-300">Security Check</div>
        
        <div className="flex items-center">
          <div 
            className={`bg-dark-400 py-2 px-4 rounded-l-md border-r border-dark-200 font-mono tracking-wider text-lg transition-all duration-500 ${isRefreshing ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'}`}
            style={{
              letterSpacing: "0.25em",
              backgroundImage: "linear-gradient(45deg, #000 0%, #222 100%)",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
              fontWeight: "bold",
              color: "#e0e0e0"
            }}
          >
            {captchaText}
          </div>
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            onClick={generateCaptcha}
            className="rounded-l-none border-0 bg-dark-400 hover:bg-dark-300 transition-colors duration-300"
          >
            <RefreshCw className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isRefreshing ? 'animate-spin' : 'hover:rotate-90'}`} />
            <span className="sr-only">Refresh CAPTCHA</span>
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter the text above"
          className="flex h-10 w-full rounded-md border-0 bg-dark-300 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2 focus:ring-offset-dark-400 transition-all duration-300"
          disabled={isVerified}
        />
        
        <Button 
          type="button" 
          onClick={handleVerify} 
          variant={isVerified ? "secondary" : "default"}
          className={`transition-all duration-300 transform ${isVerified ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-burgundy hover:bg-burgundy-dark hover:-translate-y-1'}`}
          disabled={isVerified || !userInput}
        >
          {isVerified ? (
            <span className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1 animate-[scale-in_0.3s_ease-out]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Verified
            </span>
          ) : "Verify"}
        </Button>
      </div>
    </div>
  );
}
