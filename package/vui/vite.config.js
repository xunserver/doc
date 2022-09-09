import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outputDir: 'dist/es',
    }),
  ],
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
          entryFileNames: 'index.js',
          dir: 'dist/es',
        },
        {
          format: 'cjs',
          entryFileNames: 'index.js',
          dir: 'dist/cjs',
        },
      ],
    },
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs'],
    },
  },
})
