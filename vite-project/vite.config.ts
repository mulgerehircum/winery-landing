import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), imagetools()],
  resolve: {
    preserveSymlinks: false,
  },
  optimizeDeps: {
    include: ['leaflet', 'react-leaflet'],
  },
  server: {
    host: true,
    hmr: {
      clientPort: 443,
      host: '7a14b2da9f07.ngrok-free.app'
    }
  }
})
