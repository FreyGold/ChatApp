import { Outlet, redirect } from "react-router";
import Iridescence from "./components/Iridescence";
import DarkLightSwitch from "./components/ui/DarkLightSwitch";
import { checkAuth } from "./services/api/auth.api";

import axios from "axios";

export async function appLoader() {
   try {
      const user = await checkAuth();
      return { user };
   } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
         if (err.response?.status === 400 || err.response?.status === 401) {
            throw redirect("/auth/login");
         }
      }
      throw err;
   }
}

const App = () => {
   return (
      <div className="min-w-svh min-h-svh grid p-4 text-foreground">
         <div className="absolute inset-0 -z-10">
            <Iridescence mouseReact={false} amplitude={0.5} speed={0.15} />
         </div>
         <div className="w-full h-full flex flex-col items-center justify-center">
            <DarkLightSwitch />
            <Outlet />
         </div>
      </div>
   );
};

export default App;
