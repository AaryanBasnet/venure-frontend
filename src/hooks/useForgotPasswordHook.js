// hooks/useForgotPassword.js

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { forgotPasswordService } from "../services/authServices";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordService,
    mutationKey: ["forgot-password-key"],
    onSuccess: (data) => {
      toast.success(data?.message || "Reset link sent to your email");
    },
    onError: (err) => {
      console.error(err);
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to send reset link"
      );
    },
  });
};
