import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://pratifal-backend.vercel.app',
        changeOrigin: true,
        secure: true, // If your backend uses HTTPS
        rewrite: (path) => path.replace(/^\/api/, '') // Adjust this if needed
      }
    }
  },
  plugins: [react()],
})
