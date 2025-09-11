import { useMutation, useQuery } from "@tanstack/react-query";
import { currentUserApi, loginApi, registerApi, verifyEmailApi } from "../api/authApi";

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

// Get Authenticated User
export const useCurrentUser = (accessToken) => {
  return useQuery({
    queryKey: ["authUser", accessToken],
    queryFn: () => currentUserApi(accessToken),
    enabled: !!accessToken,
  });
};

// Verify User Email
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmailApi,

    onSuccess: (data) => {
      console.log("✅ Success dans le hook:", data);
    },

    onError: (error) => {
      if (error.response) {
        console.log("❌ Error dans le hook:", error.response.data);
      } else {
        console.log("❌ Error dans le hook:", error.message);
      }
    },
  });
};