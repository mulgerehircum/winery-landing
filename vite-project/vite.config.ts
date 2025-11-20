import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    hmr: {
      clientPort: 443,
      host: '7a14b2da9f07.ngrok-free.app'
    }
  }
})
