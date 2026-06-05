// Re-exports the canonical hook under the legacy name so that LoginForm
// and any other callsite that imports { useLoginUser } keeps working.
export { useLogin as useLoginUser } from "./auth/useLogin";
