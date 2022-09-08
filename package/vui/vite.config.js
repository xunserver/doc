import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // root: './src',
  plugins: [vue()],
  publicDir: './src/public',
  resolve: {
    alias: {
      '@': './',
      '@src': './src',
      '@component': './src/component',
      '@service': './src/service',
    },
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    assetsDir: 'dist/assets',
    minify: true,
    // cssCodeSplit: true,
    rollupOptions: {
      external: ['vue'],
      input: 'src/index.ts',
      output: [
        {
          format: 'es',
          entryFileNames: '[name].es.js',
          dir: 'dist/es',
        },
      ],
    },
  },
})
