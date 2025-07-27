import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Shield,
  Loader2,
  CheckCircle,
  RefreshCw,
  X,
} from "lucide-react";
import { useVerifyResetCode } from "../../hooks/useVerifyResetCode";

export default function VerifyResetCodeForm({
  email,
  onSuccess,
  onBack,
  onClose,
}) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const inputRefs = useRef([]);
  const { mutate: verifyCode, isLoading } = useVerifyResetCode();

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCodeChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newCode = [...code];

    for (let i = 0; i < 6; i++) {
      newCode[i] = pastedData[i] || "";
    }
    setCode(newCode);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join("");

    if (fullCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    verifyCode(
      { email, code: fullCode },
      {
        onSuccess: () => {
          onSuccess(fullCode);
        },
        onError: (error) => {
          setError("Invalid code. Please try again.");
        },
      }
    );
  };

  const handleResendCode = () => {
    setTimeLeft(300);
    setCode(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
    // Here you would typically call a resend API
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-white/80 hover:text-white transition-colors duration-200 p-1"
            disabled={isLoading}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center space-x-2 text-white">
            <Shield size={24} />
            <h2 className="text-xl font-semibold">Verify Code</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors duration-200 p-1"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>
        <p className="text-indigo-100 text-sm mt-2">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      {/* Form Content */}
      <div className="px-8 py-6">
        {/* Email Display */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">
            Code sent to{" "}
            <span className="font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
              {email}
            </span>
          </p>
        </div>

        <div className="space-y-6">
          {/* Code Input */}
          <div className="space-y-4">
            <div className="flex justify-center space-x-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 ${
                    error
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : digit
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 focus:border-indigo-400 hover:border-gray-300"
                  } ${isLoading ? "opacity-75" : ""}`}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  disabled={isLoading}
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-center">
                <p className="text-red-600 text-sm flex items-center justify-center space-x-1 animate-in slide-in-from-left-1 duration-200">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  <span>{error}</span>
                </p>
              </div>
            )}
          </div>

          {/* Timer and Resend */}
          <div className="text-center space-y-3">
            {timeLeft > 0 ? (
              <p className="text-sm text-gray-600">
                Code expires in{" "}
                <span className="font-semibold text-indigo-600">
                  {formatTime(timeLeft)}
                </span>
              </p>
            ) : (
              <p className="text-sm text-red-600 font-medium">
                Code has expired
              </p>
            )}

            <button
              type="button"
              onClick={handleResendCode}
              disabled={timeLeft > 240 || isLoading} // Disable for first minute
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed flex items-center space-x-1 mx-auto transition-colors duration-200"
            >
              <RefreshCw size={14} />
              <span>Resend Code</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Back
            </button>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center space-x-2"
                disabled={isLoading || !isCodeComplete || timeLeft === 0}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    <span>Verify Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Security Tip
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                Never share this code with anyone. Our team will never ask for
                your reset code.
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
            <p className="text-sm text-gray-600 mt-2">Verifying code...</p>
          </div>
        </div>
      )}
    </div>
  );
}
