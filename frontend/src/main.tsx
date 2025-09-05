import SignUpPage from "@/pages/auth/SignUpPage.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import { ThemeProvider } from "./context/providers/ThemeProvider.tsx";
import "./index.css";
import LoginPage from "./pages/auth/LoginPage.tsx";
const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      children: [],
   },
   {
      path: "/signup",
      element: <SignUpPage />,
   },
   {
      path: "/login",
      element: <LoginPage />,
   },
]);
createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <ThemeProvider>
         <RouterProvider router={router} />
      </ThemeProvider>
   </StrictMode>
);
