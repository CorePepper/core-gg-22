import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { componentTagger } from 'lovable-tagger'
import { imagetools } from 'vite-imagetools'

export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
    headers: {
      'Content-Type': 'text/javascript; charset=utf-8',
    },
  },
  plugins: [
    react(),
    imagetools(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    modulePreload: {
      polyfill: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-toast', '@radix-ui/react-tooltip'],
        },
      },
    },
  },
}))
