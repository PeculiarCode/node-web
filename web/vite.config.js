import { defineConfig } from 'vite'
const { resolve } = require('path')
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    extensions: ['.vue', '.js', '.scss'],
    alias: {
      '@': resolve(__dirname, './src/')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
         @import "./src/assets/scss/variable.scss";
         @import "./src/assets/scss/mixin.scss";`
      }
    }
  },
  plugins: [vue()]
})
