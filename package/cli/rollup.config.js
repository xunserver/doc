import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";

export default {
  input: "./src/cli.js",
  external: ["commander", 'npm-fetch', 'download-git-repo'],
  plugins: [json(), copy({targets: [{ src: 'src/commander/add/template', dest: 'dist' }]})],  // 处理node不能直接使用import问题
  output: {
    file: "dist/index.js",
    // format: "cjs",
    banner: "#! /usr/bin/env node", // 输出文件添加头
    globals: ['npm-fetch', 'download-git-repo']
  },
};
