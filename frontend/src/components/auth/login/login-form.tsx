import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showError } from "@/lib/toast-helpers";
import { cn } from "@/lib/utils";
import { useCheckAuth, useLogin } from "@/services/hooks/auth.react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

type FormData = {
   email: string;
   password: string;
};

const userSchema = object({
   email: string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
   password: string().required("Please enter your password"),
});

export function LoginForm({
   className,
   ...props
}: React.ComponentProps<"div">) {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({
      resolver: yupResolver(userSchema),
   });
   const { data, isLoading } = useCheckAuth();

   const { mutateAsync: login, isPending } = useLogin({
      onSuccess: () => {},
      onError: (error) => {
         showError(error.response.data.message);
      },
   });

   if (isLoading) {
      return <div>Loading...</div>;
   }
   if (data?.user) {
      return (
         <div className="text-center">
            <p className="mb-4">
               You are already logged in as {data.user.fullName}.
            </p>
            <a href="/" className="underline underline-offset-4 cursor-pointer">
               Go to home page
            </a>
         </div>
      );
   }
   const onSubmit = async (data: FormData) => {
      const res = await login(data);
      console.log(res);
   };

   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card>
            <CardHeader>
               <CardTitle className="text-center">
                  Login to your account
               </CardTitle>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-5">
                     <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input {...register("email")} id="email" type="email" />
                        {errors.email && (
                           <p className="text-destructive text-sm">
                              {errors.email.message}
                           </p>
                        )}
                     </div>
                     <div className="grid gap-3">
                        <Label htmlFor="password">Password</Label>
                        <Input
                           {...register("password")}
                           id="password"
                           type="password"
                        />
                        {errors.password && (
                           <p className="text-destructive text-sm">
                              {errors.password.message}
                           </p>
                        )}
                     </div>
                     <div className="flex flex-col gap-3">
                        <Button
                           type="submit"
                           className="w-full cursor-pointer"
                           disabled={isPending}>
                           {isPending && (
                              <Loader2Icon className="animate-spin" />
                           )}
                           Login
                        </Button>
                        <Button
                           variant="outline"
                           className="w-full flex flex-col gap-0"
                           disabled>
                           Continue with Google{" "}
                           <span className="text-[0.5rem]">
                              not yet implemented
                           </span>
                        </Button>
                     </div>
                  </div>
                  <div className="mt-4 text-center text-sm">
                     Don't have an account yet?{" "}
                     <a
                        href="/auth/signup"
                        className="underline underline-offset-4 cursor-pointer">
                        Signup
                     </a>
                  </div>
               </form>
            </CardContent>
         </Card>
      </div>
   );
}
