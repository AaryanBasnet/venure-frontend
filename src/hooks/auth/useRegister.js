import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUserApi } from "../../api/authApi";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData) => {
      const res = await registerUserApi(formData);
      return res.data; // { success: true, message: "..." }
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Registration successful! Please log in.");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    },
  });
};
