import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const cssLoader = (isDev) => {
  return [
    isDev
      ? {
          loader: "style-loader",
        }
      : {
          loader: MiniCssExtractPlugin.loader,
        },
    {
      loader: "css-loader",
      options: {
        url: {
          filter: (url) => !url.startsWith("./public"),
        },
      },
    },
    {
      loader: "postcss-loader",
    },
  ];
};

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
