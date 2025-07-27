// hooks/useVerifyResetCode.js
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { verifyResetCodeService } from "../services/authServices";

export const useVerifyResetCode = () => {
  return useMutation({
    mutationFn: verifyResetCodeService,
    mutationKey: ["verify-reset-code-key"],
    onSuccess: (data) => {
      toast.success(data?.message || "Code verified successfully");
    },
    onError: (err) => {
      console.error(err);
      toast.error(err?.message || "Invalid or expired reset code");
    },
  });
};
