export const lessLoader = (options) => {
  return [
    {
      loader: "less-loader",
      options: Object.assign(
        {
          additionalData: `@import '@/style/base/_index';`, // 每个less入口添加变量
        },
        options
      ),
    },
  ];
};
