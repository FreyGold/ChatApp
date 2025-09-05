import Squares from "@/components/Squares";
import { Outlet } from "react-router";

function AuthLayout() {
   return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
         <div className="fixed inset-0 ">
            <Squares
               speed={0.2}
               squareSize={40}
               direction="diagonal"
               borderColor="oklch(0.4815 0.1178 263.3758)"
               hoverFillColor="oklch(0.6896 0.0714 234.0387)"
            />
         </div>
         <Outlet />
      </div>
   );
}

export default AuthLayout;
