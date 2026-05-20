import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Proxy /api/* to the FastAPI backend during development.
// In production, FastAPI serves the built /frontend/dist directly.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
