import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@templates": path.resolve(__dirname, "./src/components/templates"),
      "@modules": path.resolve(__dirname, "./src/components/modules"),
      "@pages": path.resolve(__dirname, "./src/routes"),
      "@hooks": path.resolve(__dirname, "./src/utils/hooks"),
      "@store": path.resolve(__dirname, "./src/utils/store"),
      "@services": path.resolve(__dirname, "./src/utils/services"),
      "@api": path.resolve(__dirname, "./src/utils/services/api"),
    },
  },
});
