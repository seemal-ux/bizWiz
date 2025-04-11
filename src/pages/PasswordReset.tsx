
import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { ResetPassword } from "@/components/auth/ResetPassword";

const PasswordReset = () => {
  return (
    <AuthLayout>
      <ResetPassword />
    </AuthLayout>
  );
};

export default PasswordReset;
