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
    onSuccess: (data) => {
      // (data) is body
      login(data?.userData, data?.token);
      toast.success(data?.message || "Login Success");
      if (data.userData.role === "Admin") navigate("/admin/dashboard");
      else navigate("/");


    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.message || "Login Failed");
    },
  });
};
