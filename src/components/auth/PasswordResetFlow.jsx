import React, { useState } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import VerifyResetCodeForm from "./VerifyResetCodeForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function PasswordResetFlow() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [verifiedCode, setVerifiedCode] = useState(null); // just the code

  const handleEmailSent = (emailValue) => {
    setEmail(emailValue);
    setEmailSent(true);
  };

  const handleVerified = (codeValue) => {
    setVerifiedCode(codeValue);
  };

  if (verifiedCode) {
    return <ResetPasswordForm email={email} code={verifiedCode} />;
  }

  if (emailSent) {
    return <VerifyResetCodeForm email={email} onVerified={handleVerified} />;
  }

  return <ForgotPasswordForm onSuccess={handleEmailSent} />;
}
