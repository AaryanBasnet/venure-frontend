import React, { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  Loader2,
  CheckCircle,
  X,
  AlertCircle,
} from "lucide-react";
import { useResetPassword } from "../../hooks/useResetPasswordHook";

export default function ResetPasswordForm({ email, code, onSuccess, onClose }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { mutate: resetPassword, isLoading } = useResetPassword();

  const validatePassword = (password) => {
    const errors = {};

    if (password.length < 8) {
      errors.length = "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      errors.uppercase = "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      errors.lowercase = "Password must contain at least one lowercase letter";
    }
    if (!/\d/.test(password)) {
      errors.number = "Password must contain at least one number";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.special = "Password must contain at least one special character";
    }

    return errors;
  };

  const getPasswordStrength = (password) => {
    const validationErrors = validatePassword(password);
    const errorCount = Object.keys(validationErrors).length;

    if (password.length === 0) return { strength: 0, label: "" };
    if (errorCount >= 4)
      return { strength: 1, label: "Very Weak", color: "bg-red-500" };
    if (errorCount >= 3)
      return { strength: 2, label: "Weak", color: "bg-orange-500" };
    if (errorCount >= 2)
      return { strength: 3, label: "Fair", color: "bg-yellow-500" };
    if (errorCount >= 1)
      return { strength: 4, label: "Good", color: "bg-blue-500" };
    return { strength: 5, label: "Strong", color: "bg-green-500" };
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword) {
      const validationErrors = validatePassword(newPassword);
      setErrors((prev) => ({ ...prev, password: validationErrors }));
    } else {
      setErrors((prev) => ({ ...prev, password: {} }));
    }

    // Clear confirm password error if passwords now match
    if (confirmPassword && newPassword === confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: null }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword && password !== newConfirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordErrors = validatePassword(password);
    let hasErrors = false;

    if (Object.keys(passwordErrors).length > 0) {
      setErrors((prev) => ({ ...prev, password: passwordErrors }));
      hasErrors = true;
    }

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      hasErrors = true;
    }

    if (hasErrors) return;

    resetPassword(
      { email, code, password },
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          setErrors({ general: "Failed to reset password. Please try again." });
        },
      }
    );
  };

  const passwordStrength = getPasswordStrength(password);
  const isFormValid =
    password &&
    confirmPassword &&
    Object.keys(errors.password || {}).length === 0 &&
    !errors.confirmPassword;

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white">
            <Lock size={24} />
            <h2 className="text-xl font-semibold">Set New Password</h2>
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
          Create a strong password for your account
        </p>
      </div>

      {/* Form Content */}
      <div className="px-8 py-6">
        {/* Email Display */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">
            Resetting password for{" "}
            <span className="font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
              {email}
            </span>
          </p>
        </div>

        <div className="space-y-6">
          {/* General Error */}
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-red-700">
              <AlertCircle size={16} />
              <span className="text-sm">{errors.general}</span>
            </div>
          )}

          {/* New Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 ${
                  errors.password && Object.keys(errors.password).length > 0
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : password
                    ? "border-indigo-300 focus:border-indigo-500 bg-indigo-50/30"
                    : "border-gray-200 focus:border-indigo-400 hover:border-gray-300"
                } ${isLoading ? "opacity-75" : ""}`}
                placeholder="Enter your new password"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    Password Strength:
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      passwordStrength.strength >= 4
                        ? "text-green-600"
                        : passwordStrength.strength >= 3
                        ? "text-blue-600"
                        : passwordStrength.strength >= 2
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{
                      width: `${(passwordStrength.strength / 5) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Password Requirements */}
            {errors.password && Object.keys(errors.password).length > 0 && (
              <div className="space-y-1">
                {Object.entries(errors.password).map(([key, message]) => (
                  <p
                    key={key}
                    className="text-red-600 text-xs flex items-center space-x-1"
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>{message}</span>
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 ${
                  errors.confirmPassword
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : confirmPassword && password === confirmPassword
                    ? "border-green-300 focus:border-green-500 bg-green-50/30"
                    : confirmPassword
                    ? "border-indigo-300 focus:border-indigo-500 bg-indigo-50/30"
                    : "border-gray-200 focus:border-indigo-400 hover:border-gray-300"
                } ${isLoading ? "opacity-75" : ""}`}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-600 text-sm flex items-center space-x-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                <span>{errors.confirmPassword}</span>
              </p>
            )}

            {confirmPassword &&
              password === confirmPassword &&
              !errors.confirmPassword && (
                <p className="text-green-600 text-sm flex items-center space-x-1">
                  <CheckCircle size={14} />
                  <span>Passwords match</span>
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
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center space-x-2"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  <span>Resetting...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  <span>Reset Password</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Security Guidelines */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Password Guidelines
              </h4>
              <ul className="text-xs text-gray-600 mt-1 space-y-1">
                <li>• Use at least 8 characters</li>
                <li>• Include uppercase and lowercase letters</li>
                <li>• Add numbers and special characters</li>
                <li>• Avoid common words or personal information</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
          <div className="text-center">
            <Loader2 className="animate-spin h-8 w-8 text-indigo-600 mx-auto" />
            <p className="text-sm text-gray-600 mt-2">Resetting password...</p>
          </div>
        </div>
      )}
    </div>
  );
}
