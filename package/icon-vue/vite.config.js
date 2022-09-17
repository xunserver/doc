import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outputDir: 'dist/es',
      tsConfigFilePath: './tsconfig.build.json',
      entryRoot: './src'
    }),
  ],
  resolve: {
    alias: {
      '@': './',
      '@src': './src'
    },
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    assetsDir: 'dist/assets',
    minify: false,
    external: [
      '@xunserver/icon'
    ],
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
          dir: 'dist/lib',
        },
      ],
    },
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs'],
    },
  },
})
