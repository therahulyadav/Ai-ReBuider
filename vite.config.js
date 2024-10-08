import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['html-to-docx'], // Externalize html-to-docx only
    },
  },
  optimizeDeps: {
    include: ['html-to-docx'], // Force Vite to pre-bundle html-to-docx
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
