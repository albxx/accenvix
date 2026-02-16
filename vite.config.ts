import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
    // Custom middleware to handle API requests during development
    middlewareMode: false,
  },
  build: {
    rollupOptions: {
      external: ['sharp'], // Exclude sharp from build as it's optional
    }
  }
})