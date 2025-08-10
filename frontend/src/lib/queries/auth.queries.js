import { useMutation } from "@tanstack/react-query";
import { loginApi, registerApi } from "../api/authApi";

//  Login Mutation
export const useLogin = () => {
  return useMutation({
    mutationFn: (data) => loginApi(data),
  });
};

// Register Mutation
export const useRegister = () => {
  return useMutation({
    mutationFn: (data) => registerApi(data),
  });
};