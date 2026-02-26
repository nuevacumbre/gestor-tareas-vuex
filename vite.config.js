// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.js'],
    css: false, // ¡Clave! Ignorar completamente CSS
    server: {
      deps: {
        inline: ['vuetify'] // Forzar transformación de Vuetify
      }
    }
  }
})