import * as Yup from "yup";

// Must match the backend rules in VenureBackend/validators/authValidators.js
export const strongPasswordSchema = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password is too long")
  .matches(/[A-Z]/, "Password must contain an uppercase letter")
  .matches(/[a-z]/, "Password must contain a lowercase letter")
  .matches(/[0-9]/, "Password must contain a number")
  .required("Password is required");
