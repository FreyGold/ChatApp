import { Outlet } from "react-router";
import Iridescence from "./components/Iridescence";
import DarkLightSwitch from "./components/ui/DarkLightSwitch";

const App = () => {
   return (
      <div className="min-w-svh min-h-svh grid p-4 text-foreground">
         <div className="absolute inset-0 -z-10">
            <Iridescence mouseReact={false} amplitude={0.1} speed={0.1} />
         </div>
         <div className="w-full h-full flex flex-col items-center justify-center">
            <DarkLightSwitch />
            <Outlet />
         </div>
      </div>
   );
};

export default App;
