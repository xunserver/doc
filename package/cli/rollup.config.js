import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript"

export default {
  input: "./src/cli.ts",
  external: [
    "commander"
  ],
  plugins: [json(), typescript()],
  output: {
    file: "dist/cli.js",
    format: "cjs",
    banner: '#! /usr/bin/env node'  // 输出文件添加头
  },
};
