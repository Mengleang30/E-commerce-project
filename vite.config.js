import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  preview: {
    host: true, // listen on all addresses (0.0.0.0)
    port: process.env.PORT ? Number(process.env.PORT) : 4173, // Railway's port or default
    allowedHosts: ['e-commerce-book-store.up.railway.app'] // your Railway hostname
  }
})
