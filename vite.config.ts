import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: /\.(jsx|js|tsx|ts)$/,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
    // Custom middleware to handle API requests during development
    middlewareMode: false,
    // CSP headers for development - allows Google Analytics
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
        "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
        "font-src 'self' https://fonts.gstatic.com data:",
        "img-src 'self' data: https:",
        "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.google-analytics.com https://*.analytics.google.com",
        "frame-src 'self' https://www.google.com https://maps.google.com https://www.google.com/maps https://embed.ly https://www.youtube.com https://player.vimeo.com",
        "frame-ancestors 'self'",
      ].join('; ')
    },
  },
  build: {
    rollupOptions: {
      external: ['sharp'], // Exclude sharp from it's optional
    }
  }
})
