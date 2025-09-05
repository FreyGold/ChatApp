import SignUpPage from "@/pages/auth/SignUpPage.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import Toaster from "./components/ui/toaster/Toaster.tsx";
import "./index.css";
import AuthLayout from "./layout/AuthLayout.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import { ReactQueryProvider } from "./services/context/providers/ReactQueryProvider.tsx";
import { ThemeProvider } from "./services/context/providers/ThemeProvider.tsx";
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
         <ReactQueryProvider>
            <RouterProvider router={router} />
            <Toaster />
         </ReactQueryProvider>
      </ThemeProvider>
   </StrictMode>
);
