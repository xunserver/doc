import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/cli.ts",
  external: ["commander"],
  plugins: [json(), typescript({ module: "esnext" })],  // 处理node不能直接使用import问题
  output: {
    file: "dist/index.js",
    format: "cjs",
    banner: "#! /usr/bin/env node", // 输出文件添加头
  },
};
