import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import VerifyResetCodeForm from "../components/auth/VerifyResetCodeForm";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

export default function LoginPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState("login"); // 'login' | 'forgot' | 'verify' | 'reset'
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleForgotPassword = () => {
    setStep("forgot");
  };

  const handleEmailSent = (userEmail) => {
    setEmail(userEmail);
    setStep("verify");
  };

  const handleCodeVerified = (resetCode) => {
    setCode(resetCode);
    setStep("reset");
  };

  const handleResetComplete = () => {
    setStep("login");
  };

  const handleCloseModal = () => {
    setStep("login");
    setEmail("");
    setCode("");
  };

  const eventChangePage = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden relative">
        <div className="w-full md:w-1/2 p-8">
          {/* Logo */}
          <div className="mb-6">
            <span className="text-3xl font-playfair font-bold text-indigo-600">
              Venure
            </span>
          </div>

          <LoginForm onForgotPassword={handleForgotPassword} />

          <div className="my-10 text-sm font-poppins text-center text-gray-600">
            Don’t have an account?{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={eventChangePage}
            >
              Sign up
            </button>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2">
          <img
            src="src/assets/venuereLoginImage.jpg"
            alt="wedding"
            className="w-full h-[600px] object-cover"
          />
        </div>

        {/* Multi-Step Modal Flow */}
        {step !== "login" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              {step === "forgot" && (
                <ForgotPasswordForm
                  defaultEmail={email}
                  onSuccess={handleEmailSent}
                  onClose={handleCloseModal}
                />
              )}
              {step === "verify" && (
                <VerifyResetCodeForm
                  email={email}
                  onSuccess={handleCodeVerified}
                  onBack={() => setStep("forgot")}
                  onClose={handleCloseModal}
                />
              )}
              {step === "reset" && (
                <ResetPasswordForm
                  email={email}
                  code={code}
                  onSuccess={handleResetComplete}
                  onClose={handleCloseModal}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
