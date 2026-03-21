import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Load environment variables
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    open: true
  },
  // Environment configuration
  define: {
    __DEV__: process.env.NODE_ENV === 'development',
  }
})
