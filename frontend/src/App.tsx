import { useTheme } from "@/context/providers/ThemeProvider";

const App = () => {
   const { theme, toggleTheme } = useTheme();

   return (
      <div className="min-w-svh flex flex-col items-center justify-center p-4 bg-background text-foreground">
         <button onClick={toggleTheme}>
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
         </button>
      </div>
   );
};

export default App;
