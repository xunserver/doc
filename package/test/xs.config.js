// 默认情况下，脚本会加载项目根目录下的

const { resolve } = require("path");

module.exports = {
  compiler: "webpack",
  type: "vue",
  typescript: true,
  /**
   * 插件默认流程发布
   * 1. build 如果存在
   */
  publish: true, // 插件默认发布流程，可传入函数自定义
  build: {
    webpackConfig: {
      // 使用webpackMerge合并
      entry: resolve(__dirname, "src/main.ts"),

      output: {
        path: resolve(__dirname, "dist"),
        filename: "[name].[chunkhash:8].js",
        chunkFilename: "chunk/[name].[contenthash:8].js",
        clean: true,
      },
    },
    webpackChain: (config) => {
      // 合并上面的config
      return config;
    },
  },
  server: {
    // 合并到
  },
};
