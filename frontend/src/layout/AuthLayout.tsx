import Silk from "@/components/Silk";
import { Outlet } from "react-router";
import { useCSSVariable } from "use-css-dom";

function AuthLayout() {
   const primaryColor = useCSSVariable("--primary", 0.8, "hex");
   return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
         <div className="fixed inset-0">
            <Silk
               speed={4}
               scale={1}
               color={primaryColor}
               noiseIntensity={1}
               rotation={0}
            />
         </div>
         <Outlet />
      </div>
   );
}

export default AuthLayout;
