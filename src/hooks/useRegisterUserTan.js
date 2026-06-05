// Re-exports the canonical hook as the legacy default so RegisterForm
// and any other callsite that imports useRegisterUserTan keeps working.
export { useRegister as default } from "./auth/useRegister";
