// 默认情况下，脚本会加载项目根目录下的

module.exports = {
  type: "vue",
  typescript: true,
  publish: true,
  build: {
    webpackConfig: {
      // 使用webpackMerge合并
    },
    chainWebpack: (config) => {
      // 合并上面的config
    },
  },
  server: {
    // 合并到
  },
};
å;
