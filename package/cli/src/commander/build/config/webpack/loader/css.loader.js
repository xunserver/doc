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
