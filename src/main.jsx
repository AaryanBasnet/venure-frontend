import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";

import AppRouter from "./routers/AppRouter.jsx";
import AuthContextProvider from "./auth/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient(); 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AppRouter />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          theme="dark"
        />
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
