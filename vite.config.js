import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// Design tokens live in src/styles/theme.css (Tailwind v4 @theme), not here.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Vite doesn't read PORT itself — honor it when set (e.g. by the dev harness)
  // so a fixed port isn't required; backend CORS already allows any localhost port in dev.
  server: process.env.PORT ? { port: Number(process.env.PORT) } : undefined,
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          animations: ["framer-motion"],
          query: ["@tanstack/react-query"],
          icons: ["lucide-react", "react-icons"],
        },
      },
    },
  },
});
