// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Utiliser la syntaxe ES module sans NodeJS namespace
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs']
  },
  optimizeDeps: {
    force: true,
    include: ['mupen64plus-web']
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    },
    fs: {
      allow: ['..']
    }
  },
  build: {
    target: 'es2020'
  }
});