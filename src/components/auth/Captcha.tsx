
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

  const generateCaptcha = () => {
    // Generate a simple alphanumeric CAPTCHA (readable)
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let result = "";
    const length = 6; // 6 characters is easy to read but still secure enough
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    setCaptchaText(result);
    setUserInput("");
    setIsVerified(false);
    onVerify(false);
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
    <div className="space-y-3">
      <div className="flex flex-col space-y-2">
        <div className="text-sm font-medium text-gray-300">Security Check</div>
        
        <div className="flex items-center">
          <div 
            className="bg-dark-400 py-2 px-4 rounded-l-md border-r border-dark-200 font-mono tracking-wider text-lg"
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
            className="rounded-l-none border-0 bg-dark-400 hover:bg-dark-300"
          >
            <RefreshCw className="h-4 w-4 text-gray-400" />
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
          className="flex h-10 w-full rounded-md border-0 bg-dark-300 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2 focus:ring-offset-dark-400"
          disabled={isVerified}
        />
        
        <Button 
          type="button" 
          onClick={handleVerify} 
          variant={isVerified ? "secondary" : "default"}
          className={isVerified ? "bg-emerald-700 hover:bg-emerald-800" : "bg-burgundy hover:bg-burgundy-dark"}
          disabled={isVerified || !userInput}
        >
          {isVerified ? "Verified" : "Verify"}
        </Button>
      </div>
    </div>
  );
}
