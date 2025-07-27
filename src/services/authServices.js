import {
  loginUserApi,
  registerUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  verifyResetCodeApi,
} from "../api/authApi";

// Register Service
export const registerUserService = async (formData) => {
  try {
    const response = await registerUserApi(formData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Registration Failed" };
  }
};

// Login Service
export const loginUserService = async (formData) => {
  try {
    const response = await loginUserApi(formData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Login Failed" };
  }
};

// Forgot Password Service
export const forgotPasswordService = async (formData) => {
  try {
    const response = await forgotPasswordApi(formData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to send reset code" };
  }
};

// Reset Password Service (expects { email, code, password } in formData)
export const resetPasswordService = async (formData) => {
  try {
    const response = await resetPasswordApi(formData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Password reset failed" };
  }
};

export const verifyResetCodeService = async (formData) => {
  try {
    const response = await verifyResetCodeApi(formData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Reset code verification failed" };
  }
};