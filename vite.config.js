import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({

  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    strictPort: false // Allow Railway to assign its port
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    strictPort: false
  },

  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer', 'crypto', 'stream', 'util', 'events'],
      globals: {
        Buffer: true,
      },
      overrides: {
        fs: 'memfs',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'stream': 'stream-browserify',
      'buffer': 'buffer',
      'util': 'util',
    }
  },
  define: {
    'global': 'globalThis',
    'process.env': {},
  },
  css: {
    postcss: './postcss.config.js',
    modules: {
      localsConvention: 'camelCase'
    }
  },
  build: {
    rollupOptions: {
      external: ['fs', 'path'],
      output: {
        manualChunks: {
          'solana-web3': ['@solana/web3.js'],
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
          ],
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    sourcemap: true,
    target: 'esnext',
  },
  optimizeDeps: {
    include: ['tailwindcss', 'postcss', 'autoprefixer'],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  server: {
    host: true,
    port: process.env.PORT || 3000,
  },
  preview: {
    host: true,
    port: process.env.PORT || 3000,
  },
});
