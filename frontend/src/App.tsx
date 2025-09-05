import { useTheme } from "@/context/providers/ThemeProvider";

const App = () => {
   const { theme, toggleTheme } = useTheme();

   return (
      <button onClick={toggleTheme}>
         Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
   );
};

export default App;
