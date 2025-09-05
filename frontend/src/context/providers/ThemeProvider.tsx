import {
   createContext,
   type ReactNode,
   useContext,
   useEffect,
   useState,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
   theme: Theme;
   toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
   const [theme, setTheme] = useState<Theme>(() => {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored) return stored;

      return window.matchMedia("(prefers-color-scheme: dark)").matches
         ? "dark"
         : "light";
   });

   useEffect(() => {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
   }, [theme]);

   const toggleTheme = () => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
   };

   return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
      </ThemeContext.Provider>
   );
};

export const useTheme = () => {
   const context = useContext(ThemeContext);
   if (!context)
      throw new Error("useTheme must be used within a ThemeProvider");
   return context;
};
