import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
      heading: ['"Playfair Display"', 'serif'],
      body: ['Lato', 'sans-serif'],
    },
       colors: {
      primary: "#C91F37",
      secondary: "#0E0E0E",
      cream: "#FAF8F3",
    },
      keyframes: {
      
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        scaleIn: "scaleIn 0.3s ease-out forwards",
        fadeIn: "fadeIn 0.2s ease-out forwards",
      },
    },
  },
  plugins: [react(),tailwindcss()],
});
