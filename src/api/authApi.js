import axios from "./api";

export const registerUserApi = (data) => axios.post("/auth/register", data);
export const loginUserApi = (data) => axios.post("/auth/login", data);

// Send email to get reset code
export const forgotPasswordApi = (data) => axios.post("/auth/forgot-password", data);

// Verify the code user received via email
export const verifyResetCodeApi = (data) => axios.post("/auth/verify-reset-code", data);

export const resetPasswordApi = (data) => axios.post("/auth/reset-password", data);
