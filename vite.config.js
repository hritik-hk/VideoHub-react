import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dhev/config/
export default defineConfig({
  plugins: [react()],
  base: "/VideoHub-react/"
})
