import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy : {
      '/api' : 'http://localhost:8000'
    }
  },
  plugins: [react()],
})


// vite proxy not works in production