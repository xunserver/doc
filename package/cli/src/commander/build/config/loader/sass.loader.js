export const sassLoader = (options) => {
  return [
    {
      loader: "resolve-url-loader",
    },
    {
      loader: "sass-loader",
      options: Object.assign(
        {
          sourceMap: true,
          additionalData: `@import '@/style/base/_index';`, // 每个入口scss文件添加变量
        },
        options
      ),
    },
  ];
};
