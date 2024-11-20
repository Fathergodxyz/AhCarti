import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer', 'crypto', 'stream', 'util', 'events'],
      globals: {
        Buffer: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'stream': 'stream-browserify',
      'buffer': 'buffer',
    }
  },
  define: {
    'global': 'globalThis',
    'process.env': {}
  },
  build: {
    rollupOptions: {
      external: ['fs', 'path'],
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  optimizeDeps: {
    include: [
      '@solana/web3.js',
      '@solana/buffer-layout',
      'buffer',
    ],
    esbuildOptions: {
      target: 'esnext',
    }
  }
});
