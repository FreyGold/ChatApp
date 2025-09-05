import SignUpPage from "@/pages/auth/SignUpPage.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import { ThemeProvider } from "./context/providers/ThemeProvider.tsx";
import "./index.css";
import AuthLayout from "./layout/AuthLayout.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      children: [],
   },
   {
      path: "/auth",
      element: <AuthLayout />,
      children: [
         { path: "login", element: <LoginPage /> },
         {
            path: "signup",
            element: <SignUpPage />,
         },
      ],
   },
]);
createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <ThemeProvider>
         <RouterProvider router={router} />
      </ThemeProvider>
   </StrictMode>
);
