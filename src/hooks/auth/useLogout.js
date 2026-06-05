import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUserApi } from "../../api/authApi";
import { useAuthStore } from "../../store/authStore";
import { disconnectSocket } from "../../lib/socket";

export const useLogout = () => {
  const clearUser = useAuthStore((s) => s.clearUser);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUserApi,
    onSettled: () => {
      // Clear client state regardless of server response
      clearUser();
      queryClient.clear();
      disconnectSocket();
      navigate("/login");
    },
    onError: () => {
      toast.error("Sign-out encountered an issue, but you have been logged out locally.");
    },
  });
};
