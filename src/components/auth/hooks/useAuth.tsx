
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
      try {
        const userData = JSON.parse(loggedInUser);
        if (userData.rememberMe && userData.expiresAt > Date.now()) {
          toast({
            title: "Welcome back!",
            description: `You're already logged in as ${userData.email}`,
          });
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error parsing authUser from localStorage:", error);
        localStorage.removeItem("authUser");
      }
    }
  }, [navigate, toast]);

  // Initialize users in localStorage if it doesn't exist
  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
      console.log("Initialized users array in localStorage");
    }
  }, []);

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
      // Ensure we're retrieving valid JSON from localStorage
      let storedUsers = [];
      try {
        const storedUsersData = localStorage.getItem("users");
        storedUsers = storedUsersData ? JSON.parse(storedUsersData) : [];
        
        // If somehow the stored value isn't an array, reset it
        if (!Array.isArray(storedUsers)) {
          console.warn("Users data in localStorage is not an array. Resetting.");
          storedUsers = [];
        }
      } catch (error) {
        console.error("Error parsing users from localStorage:", error);
        storedUsers = [];
      }

      // Check if user with this email already exists
      const userIndex = storedUsers.findIndex((u: {email: string}) => 
        u.email.toLowerCase() === email.toLowerCase()
      );
      const user = userIndex >= 0 ? storedUsers[userIndex] : null;

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
          try {
            localStorage.setItem("users", JSON.stringify(storedUsers));
            console.log("New user registered:", email);
            
            authenticateUser(newUser);
            toast({
              title: "Account created",
              description: "Your account has been created and you're now logged in",
            });
          } catch (error) {
            console.error("Error saving new user to localStorage:", error);
            toast({
              title: "Registration failed",
              description: "Unable to save your account. Please try again.",
              variant: "destructive",
            });
          }
        }
      } else {
        // Login flow
        console.log("Attempting login for:", email);
        console.log("Stored users count:", storedUsers.length);
        
        if (!user) {
          // If the specific email wasn't found, automatically create an account for testing purposes
          // This is only for the demo - in a real app, you would not do this
          const newUser = { email, password, rememberMe };
          storedUsers.push(newUser);
          try {
            localStorage.setItem("users", JSON.stringify(storedUsers));
            authenticateUser(newUser);
            toast({
              title: "Welcome!",
              description: "We've created an account for you and logged you in.",
            });
          } catch (error) {
            toast({
              title: "Account not found",
              description: "No account found with this email. Please create an account.",
              variant: "destructive",
            });
          }
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
    
    try {
      localStorage.setItem("authUser", JSON.stringify(authUser));
      console.log("User authenticated:", authUser.email);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving auth session to localStorage:", error);
      toast({
        title: "Login failed",
        description: "Unable to create your session. Please try again.",
        variant: "destructive",
      });
    }
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
