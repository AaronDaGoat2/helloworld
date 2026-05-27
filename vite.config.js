import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'node:url'




// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  '@': fileURLToPath(new URL('./src', import.meta.url)),
  server: {
    proxy: {
      '/nominatim': {
        target: 'https://nominatim.openstreetmap.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/nominatim/, '')
      },
    },
  },
})
