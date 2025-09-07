import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showError } from "@/lib/toast-helpers";
import { cn } from "@/lib/utils";
import { useSignup } from "@/services/hooks/auth.react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

type FormData = {
   fullName: string;
   email: string;
   password: string;
};

const userSchema = object({
   fullName: string().required("Please enter your name"),
   email: string()
      .email("Please enter a valid email")
      .required("Email is required"),
   password: string()
      .required("Please enter your password")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must include at least one uppercase letter")
      .matches(/[a-z]/, "Must include at least one lowercase letter")
      .matches(/[0-9]/, "Must include at least one number")
      .matches(/[^a-zA-Z0-9]/, "Must include at least one special character"),
});

export function SignupForm({
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

   const { mutateAsync: signup, isPending } = useSignup({
      onSuccess: (data) => {
         console.log("Signing up successful!", data);
         window.location.href = "/";
      },
      onError: (error) => {
         showError(error.response.data.message);
      },
   });

   const onSubmit = async (data: FormData) => {
      const res = await signup(data);
      console.log(res);
   };

   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card>
            <CardHeader>
               <CardTitle className="text-center">Create New Account</CardTitle>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-5">
                     <div className="grid gap-3">
                        <Label htmlFor="fullName">Name</Label>
                        <Input
                           {...register("fullName")}
                           id="fullName"
                           type="text"
                           placeholder="John Doe"
                        />
                        {errors.fullName && (
                           <span className="text-destructive text-sm relative">
                              {errors.fullName.message}
                           </span>
                        )}
                     </div>

                     <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                           {...register("email")}
                           id="email"
                           type="email"
                           placeholder="m@example.com"
                        />
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
                           Signup
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
                     Already have an account?{" "}
                     <a
                        href="/auth/login"
                        className="underline underline-offset-4 cursor-pointer">
                        Login
                     </a>
                  </div>
               </form>
            </CardContent>
         </Card>
      </div>
   );
}
