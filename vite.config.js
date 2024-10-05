import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": "/src/app",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@configs": "/src/configs",
      "@constants": "/src/constants",
      "@hooks": "/src/hooks",
      "@images": "/src/assets/images",
      "@layouts": "/src/layouts",
      "@pages": "/src/pages",
      "@redux": "/src/redux",
      "@routes": "/src/routes",
      "@services": "/src/services",
      "@tools": "/src/tools",
      "@db": "/src/db",
      "@validations": "/src/validations",
    },
  },
  server: {
    port: 3000,
  },
});
