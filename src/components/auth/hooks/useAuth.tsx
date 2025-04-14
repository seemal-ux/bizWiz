
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authUser");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      if (userData.rememberMe && userData.expiresAt > Date.now()) {
        toast({
          title: "Welcome back!",
          description: `You're already logged in as ${userData.email}`,
        });
        navigate("/dashboard");
      }
    }
  }, [navigate, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCaptchaVerified) {
      toast({
        title: "CAPTCHA verification required",
        description: "Please complete the CAPTCHA verification first",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    if (isCreateAccount && password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const user = storedUsers.find((u: {email: string}) => u.email === email);

      if (isCreateAccount) {
        if (user) {
          toast({
            title: "Account already exists",
            description: "This email is already registered. Please sign in instead.",
            variant: "destructive",
          });
        } else {
          const newUser = { email, password, rememberMe };
          storedUsers.push(newUser);
          localStorage.setItem("users", JSON.stringify(storedUsers));
          
          authenticateUser(newUser);
          toast({
            title: "Account created",
            description: "Your account has been created and you're now logged in",
          });
        }
      } else {
        if (!user) {
          toast({
            title: "Account not found",
            description: "No account found with this email. Please create an account.",
            variant: "destructive",
          });
        } else if (user.password === password) {
          authenticateUser({ ...user, rememberMe });
          toast({
            title: "Login successful",
            description: "Welcome to your dashboard!",
          });
        } else {
          toast({
            title: "Authentication failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
        }
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const authenticateUser = (userData: {email: string, rememberMe: boolean}) => {
    const authUser = {
      email: userData.email,
      rememberMe: userData.rememberMe,
      token: generateToken(),
      expiresAt: userData.rememberMe 
        ? Date.now() + (30 * 24 * 60 * 60 * 1000)
        : Date.now() + (1 * 60 * 60 * 1000)
    };
    
    localStorage.setItem("authUser", JSON.stringify(authUser));
    navigate("/dashboard");
  };

  const generateToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const toggleMode = () => {
    setIsCreateAccount(!isCreateAccount);
    setPassword("");
    setConfirmPassword("");
    setIsCaptchaVerified(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    rememberMe,
    setRememberMe,
    isLoading,
    isCreateAccount,
    isCaptchaVerified,
    setIsCaptchaVerified,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleSubmit,
    toggleMode
  };
};
