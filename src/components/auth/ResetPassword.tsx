
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ResetStep {
  step: "request" | "confirmation" | "reset";
  email?: string;
  token?: string;
}

export function ResetPassword() {
  const [resetState, setResetState] = useState<ResetStep>({ step: "request" });
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API request to send password reset email
    setTimeout(() => {
      // Check if user with this email exists
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const user = storedUsers.find((u: { email: string }) => u.email === email);

      if (!user) {
        toast({
          title: "Email not found",
          description: "No account exists with this email address",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // In a real implementation, you would send an email with a reset token
      // For this demo, we'll generate a token and store it in localStorage
      const resetToken = generateResetToken();
      
      // Store the reset token with the email
      const resetRequests = JSON.parse(localStorage.getItem("resetRequests") || "[]");
      resetRequests.push({
        email,
        token: resetToken,
        createdAt: Date.now()
      });
      localStorage.setItem("resetRequests", JSON.stringify(resetRequests));
      
      // Move to confirmation step
      setResetState({ step: "confirmation", email });
      
      toast({
        title: "Reset email sent",
        description: "Check your email for password reset instructions",
      });
      
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyToken = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Verify token
      const resetRequests = JSON.parse(localStorage.getItem("resetRequests") || "[]");
      const validRequest = resetRequests.find((req: { email: string, token: string }) => 
        req.email === resetState.email && req.token === resetToken
      );

      if (!validRequest) {
        toast({
          title: "Invalid token",
          description: "The reset token is invalid or has expired",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Move to reset password step
      setResetState({ step: "reset", email: resetState.email, token: resetToken });
      setIsLoading(false);
    }, 1000);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      // Get existing users
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = storedUsers.findIndex((u: { email: string }) => u.email === resetState.email);

      if (userIndex === -1) {
        toast({
          title: "User not found",
          description: "Could not update password for this user",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Update the user's password
      storedUsers[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(storedUsers));

      // Remove the used reset token
      const resetRequests = JSON.parse(localStorage.getItem("resetRequests") || "[]");
      const filteredRequests = resetRequests.filter(
        (req: { email: string, token: string }) => 
          !(req.email === resetState.email && req.token === resetState.token)
      );
      localStorage.setItem("resetRequests", JSON.stringify(filteredRequests));

      toast({
        title: "Password reset successful",
        description: "Your password has been updated. You can now sign in with your new password.",
      });

      // Redirect to sign in page
      navigate("/");
      setIsLoading(false);
    }, 1000);
  };

  const generateResetToken = () => {
    // For demo purposes, this is a simple token
    // In a real app, use a secure token generator
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  const goBack = () => {
    if (resetState.step === "confirmation" || resetState.step === "reset") {
      setResetState({ step: "request" });
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          {resetState.step === "request" 
            ? "Reset your password" 
            : resetState.step === "confirmation"
              ? "Check your email"
              : "Create new password"}
        </h1>
        <p className="text-auth-muted">
          {resetState.step === "request"
            ? "Enter your email to receive a password reset link"
            : resetState.step === "confirmation"
              ? "Enter the reset code sent to your email"
              : "Enter and confirm your new password"}
        </p>
      </div>
      
      {resetState.step === "request" && (
        <form onSubmit={handleRequestReset} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="reset-email" className="text-sm text-gray-300">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-auth-muted" />
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="auth-input pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="auth-btn w-full flex items-center justify-center gap-2" 
            disabled={isLoading}
          >
            {isLoading ? "Sending reset email..." : "Send reset email"}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            className="w-full text-auth-muted hover:text-white flex items-center justify-center gap-2"
            onClick={goBack}
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" /> Back to sign in
          </Button>
        </form>
      )}
      
      {resetState.step === "confirmation" && (
        <form onSubmit={handleVerifyToken} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="reset-token" className="text-sm text-gray-300">Reset code</Label>
            <Input
              id="reset-token"
              type="text"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              placeholder="Enter the code from your email"
              className="auth-input"
              required
              disabled={isLoading}
            />
            <p className="text-xs text-auth-muted">
              We've sent a reset code to {resetState.email}. 
              Please check your inbox and spam folders.
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="auth-btn w-full flex items-center justify-center gap-2" 
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify code"}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            className="w-full text-auth-muted hover:text-white flex items-center justify-center gap-2"
            onClick={goBack}
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </form>
      )}
      
      {resetState.step === "reset" && (
        <form onSubmit={handleResetPassword} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-sm text-gray-300">New password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="auth-input"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-sm text-gray-300">Confirm new password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="auth-input"
              required
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="auth-btn w-full flex items-center justify-center gap-2" 
            disabled={isLoading}
          >
            {isLoading ? "Resetting password..." : "Reset password"}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            className="w-full text-auth-muted hover:text-white flex items-center justify-center gap-2"
            onClick={goBack}
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </form>
      )}
    </div>
  );
}
