
import React from "react";
import { EmailInput } from "./form/EmailInput";
import { PasswordInput } from "./form/PasswordInput";
import { ConfirmPasswordInput } from "./form/ConfirmPasswordInput";
import { RememberMeCheckbox } from "./form/RememberMeCheckbox";
import { SubmitButton } from "./form/SubmitButton";
import { AuthToggle } from "./form/AuthToggle";
import { Captcha } from "./Captcha";
import { useAuth } from "./hooks/useAuth";

export function AuthForm() {
  const {
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
  } = useAuth();

  return (
    <div className="w-full max-w-md transform transition-all duration-500 animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-display font-bold text-white mb-2 animate-fade-in" 
           style={{animationDelay: "0.2s"}}>
          {isCreateAccount ? "Create an account" : "Let's Get Started"}
        </h1>
        <p className="text-auth-muted animate-fade-in" style={{animationDelay: "0.3s"}}>
          {isCreateAccount 
            ? "Enter your details to create your account" 
            : "Enter your credentials to access your account"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <EmailInput 
          email={email} 
          setEmail={setEmail} 
          isLoading={isLoading} 
        />
        
        <PasswordInput 
          password={password}
          setPassword={setPassword}
          isLoading={isLoading}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          isCreateAccount={isCreateAccount}
        />
        
        {isCreateAccount && (
          <ConfirmPasswordInput 
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            isLoading={isLoading}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        )}
        
        <div className="animate-fade-in" style={{animationDelay: "0.7s"}}>
          <Captcha onVerify={(verified) => setIsCaptchaVerified(verified)} />
        </div>
        
        <RememberMeCheckbox 
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          isLoading={isLoading}
        />
        
        <SubmitButton 
          isLoading={isLoading}
          isCreateAccount={isCreateAccount}
          isCaptchaVerified={isCaptchaVerified}
        />
      </form>
      
      <AuthToggle 
        isCreateAccount={isCreateAccount}
        toggleMode={toggleMode}
      />
    </div>
  );
}
