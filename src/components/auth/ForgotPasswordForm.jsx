import React, { useState, useEffect } from "react";
import { Mail, ArrowLeft, Loader2, Shield } from "lucide-react";
import { useForgotPassword } from "../../hooks/useForgotPasswordHook";

export default function ForgotPasswordForm({
  defaultEmail = "",
  onSuccess,
  onClose,
}) {
  const [email, setEmail] = useState(defaultEmail);
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutate: forgotPassword, isLoading } = useForgotPassword();

  useEffect(() => {
    setEmail(defaultEmail);
  }, [defaultEmail]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (emailError && value) {
      if (validateEmail(value)) {
        setEmailError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    setIsSubmitted(true);

    forgotPassword(
      { email },
      {
        onSuccess: () => {
          onSuccess(email); // Pass email to parent
        },
      }
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors duration-200 p-1"
            disabled={isLoading}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center space-x-2 text-white">
            <Shield size={24} />
            <h2 className="text-xl font-semibold">Reset Password</h2>
          </div>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>
        <p className="text-indigo-100 text-sm mt-2">
          Enter your email address and we'll send you a reset code
        </p>
      </div>

      {/* Form Content */}
      <div className="px-8 py-6">
        <div onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail
                  className={`h-5 w-5 transition-colors duration-200 ${
                    emailError
                      ? "text-red-400"
                      : email
                      ? "text-indigo-500"
                      : "text-gray-400"
                  }`}
                />
              </div>
              <input
                id="email"
                type="email"
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 ${
                  emailError
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : email
                    ? "border-indigo-300 focus:border-indigo-500 bg-indigo-50/30"
                    : "border-gray-200 focus:border-indigo-400 hover:border-gray-300"
                } ${isLoading ? "opacity-75" : ""}`}
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
            {emailError && (
              <p className="text-red-600 text-sm flex items-center space-x-1 animate-in slide-in-from-left-1 duration-200">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                <span>{emailError}</span>
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center space-x-2"
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  <span>Sending Code...</span>
                </>
              ) : (
                <>
                  <Mail size={16} />
                  <span>Send Reset Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Security Note
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                For your security, the reset code will expire in 15 minutes. If
                you don't receive the email, check your spam folder.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
          <div className="text-center">
            <Loader2 className="animate-spin h-8 w-8 text-indigo-600 mx-auto" />
            <p className="text-sm text-gray-600 mt-2">Sending reset code...</p>
          </div>
        </div>
      )}
    </div>
  );
}
