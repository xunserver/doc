const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
  posix: { relative },
} = require("path");

exports.cssLoader = (isDev) => {
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

exports.sassLoader = (options) => {
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

exports.lessLoader = (options) => {
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
