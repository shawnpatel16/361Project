import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/habit/test": "http://localhost:5000",
      "/habit/workout": "http://localhost:5000",
      "/habit/meal": "http://localhost:5000",
      "/habit/book": "http://localhost:5000",

    },
  },
  plugins: [react()],
})
