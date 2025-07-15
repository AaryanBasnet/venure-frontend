import { toast } from "react-toastify";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";
import { loginUserService } from "../services/authServices";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLoginUser = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUserService,
    mutationKey: ["login-key"],
    onSuccess: async (data) => {
      await login(data?.userData, data?.token);
      toast.success(data?.message || "Login Success");

      const role = data?.userData?.role;

      setTimeout(() => {
        if (role === "Admin") {
          navigate("/admin/dashboard");
        } else if (role === "VenueOwner") {
          navigate("/owner/dashboard");
        } else {
          navigate("/");
        }
      }); // 100ms delay to ensure context updates before routing
    },
    onError: (err) => {
      console.error(err);
      toast.error(
        err?.response?.data?.message || err?.message || "Login Failed"
      );
    },
  });
};
