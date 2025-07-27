// hooks/useResetPassword.js
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { resetPasswordService } from "../services/authServices";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPasswordService,
    mutationKey: ["reset-password-key"],
    onSuccess: (data) => {
      toast.success(data?.message || "Password reset successful");
      setTimeout(() => navigate("/login"), 700);
    },
    onError: (err) => {
      console.error(err);
      toast.error(err?.message || "Password reset failed");
    },
  });
};
