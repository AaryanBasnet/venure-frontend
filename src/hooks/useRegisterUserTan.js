import { useMutation } from "@tanstack/react-query";
import React from "react";
import { registerUserService } from "../services/authServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useRegisterUserTan() {
    const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUserService,
    mutationKey: ["register"],
    onSuccess: (data) => {
      toast.success(data.message || "Registration Successful");
      
      navigate("/login");
    },

    onError: (err) => {
      toast.error(err.message || "Registration Failed");
    },
  });
}
