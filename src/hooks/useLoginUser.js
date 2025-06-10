import { toast } from "react-toastify";

import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";
import { loginUserService } from "../services/authServices";
import { useMutation } from "@tanstack/react-query";
export const useLoginUser = () => {
  const { login } = useContext(AuthContext);

  return useMutation({
    mutationFn: loginUserService,
    mutationKey: ["login-key"],
    onSuccess: (data) => {
      // (data) is body
      login(data?.data, data?.token);
      toast.success(data?.message || "Login Success");
    },
    onError: (err) => {
        console.log(err)
      toast.error(err?.message || "Login Failed");
    },
  });
};
