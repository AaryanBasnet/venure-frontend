import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  theme: {
    extend: {
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
  plugins: [tailwindcss()],
});
