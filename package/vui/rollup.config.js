import vue from '@vitejs/plugin-vue'
import typescript from '@rollup/plugin-typescript'

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: {
    main: './src/index.ts',
    button: './src/component/button/index.ts',
  },
  output: {
    dir: './dist',
    format: 'esm',
  },
  plugins: [typescript(), vue()],
}
