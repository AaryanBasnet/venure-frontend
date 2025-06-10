import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppRouter from "./routers/AppRouter.jsx";
import AuthContextProvider from "./auth/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient(); // <-- instantiate here

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          theme="dark"
        />
      </QueryClientProvider>
    </AuthContextProvider>
  </StrictMode>
);
