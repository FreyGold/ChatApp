import {
   useMutation,
   useQuery,
   type UseMutationOptions,
   type UseQueryOptions,
} from "@tanstack/react-query";
import { checkAuth, login, signup } from "../api/auth.api";

type LoginInput = { email: string; password: string };
type SignupInput = { email: string; password: string; fullName: string };

type LoginResponse = {
   message: string;
};
type SignupResponse = {
   message: string;
   user: {
      _id: string;
      email: string;
      fullName: string;
   };
};

type ApiError = {
   message: string;
   response: {
      data: {
         message: string;
      };
   };
};
export const useLogin = (
   options?: UseMutationOptions<LoginResponse, ApiError, LoginInput>
) => {
   return useMutation({
      mutationFn: (data: { email: string; password: string }) =>
         login(data.email, data.password),
      ...options,
   });
};

export const useSignup = (
   options?: UseMutationOptions<SignupResponse, ApiError, SignupInput>
) => {
   return useMutation({
      mutationFn: ({
         email,
         password,
         fullName,
      }: {
         email: string;
         password: string;
         fullName: string;
      }) => signup(email, password, fullName),
      ...options,
   });
};

type CheckAuthResponse = {
   message: string;
   user?: {
      _id: string;
      email: string;
      fullName: string;
   };
};

export const useCheckAuth = (
   options?: UseQueryOptions<CheckAuthResponse, ApiError>
) => {
   return useQuery<CheckAuthResponse, ApiError>({
      queryKey: ["auth"],
      queryFn: checkAuth,
      retry: false,
      ...options,
   });
};
