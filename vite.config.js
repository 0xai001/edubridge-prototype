import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this from /edubridge-prototype/, not the domain root, so
// built asset URLs need that prefix. Dev server is unaffected.
// https://vite.dev/config/
export default defineConfig({
  base: '/edubridge-prototype/',
  plugins: [react(), tailwindcss()],
})
