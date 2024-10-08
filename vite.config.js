import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
   build: {
    rollupOptions: {
      external: ['html-docx-js'],  // Externalize 'html-docx-js'
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['html-docx-js'],  // Pre-bundle html-to-docx
  },
});
