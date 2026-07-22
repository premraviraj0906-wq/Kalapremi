import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['gsap', '@gsap/react', 'framer-motion'],
          'ui-vendor': ['lucide-react', 'react-icons'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
})
