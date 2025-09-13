import { useTheme } from "@/services/context/providers/ThemeProvider";
import { FiMoon, FiSun } from "react-icons/fi";

function DarkLightSwitch() {
   const { theme, toggleTheme } = useTheme();

   return (
      <div
         className="absolute top-4 right-4 flex px-2 h-8 w-16 justify-between dark:bg-white bg-black rounded-3xl items-center cursor-pointer transition-colors duration-300 z-10"
         onClick={() => toggleTheme()}>
         {/* Ball */}
         <span
            className={`
            absolute top-1/2 -translate-y-1/2 right-1
            h-6 w-6 rounded-full  shadow-md transition-all duration-400
            ${
               theme === "dark"
                  ? "-translate-x-8 bg-black"
                  : "translate-x-0 bg-white"
            }
         `}
            style={{ zIndex: 1 }}
         />
         <div>{theme === "light" && <FiSun color="white"></FiSun>}</div>
         <div>{theme === "dark" && <FiMoon color="black"></FiMoon>}</div>
      </div>
   );
}

export default DarkLightSwitch;
