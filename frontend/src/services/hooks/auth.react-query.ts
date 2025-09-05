import { useMutation } from "@tanstack/react-query";
import { login, signup } from "../api/auth.api";

export const useLogin = () => {
   return useMutation({
      mutationFn: ({ email, password }: { email: string; password: string }) =>
         login(email, password),
   });
};
export const useSignup = () => {
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
   });
};
