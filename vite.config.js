import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// Design tokens live in src/styles/theme.css (Tailwind v4 @theme), not here.
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
