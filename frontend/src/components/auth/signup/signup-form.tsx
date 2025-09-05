import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

type FormData = {
   name: string;
   email: string;
   password: string;
};

const userSchema = object({
   name: string().required("Please enter your name"),
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

   const onSubmit = (data: FormData) => {
      console.log("✅ Form Submitted:", data);
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
                        <Label htmlFor="name">Name</Label>
                        <Input
                           {...register("name")}
                           id="name"
                           type="text"
                           placeholder="John Doe"
                        />
                        {errors.name && (
                           <span className="text-destructive text-sm relative">
                              {errors.name.message}
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
                        <Button type="submit" className="w-full cursor-pointer">
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
                        href="/login"
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
