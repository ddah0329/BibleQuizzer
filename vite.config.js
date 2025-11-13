// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 1. path 임포트 확인

export default defineConfig({
  plugins: [react()],
  // 2. resolve.alias 부분이 정확히 추가되었는지 확인
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})