const MiniCssExtractPlugin = require("mini-css-extract-plugin");
exports.getCssloader = (isDev) => {
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
