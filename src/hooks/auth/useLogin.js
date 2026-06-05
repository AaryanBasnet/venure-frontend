import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../../api/authApi";
import { useAuthStore } from "../../store/authStore";

export const useLogin = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      const res = await loginUserApi(credentials);
      // Backend envelope: { success: true, data: { _id, name, email, role, ... } }
      return res.data.data;
    },
    onSuccess: (user) => {
      setUser(user);
      // Invalidate the me-query so it reflects the freshly-set cookie
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast.success("Welcome back!");

      if (user?.role === "Admin") navigate("/admin/dashboard");
      else if (user?.role === "VenueOwner") navigate("/owner/dashboard");
      else navigate("/");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    },
  });
};
