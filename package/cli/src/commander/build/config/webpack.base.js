import { createAlias } from "../util/alias";
import { createDefineFromEnv } from "../../../utils/env";
import { resolveFromRoot } from "../util/path";
import { cssLoader } from "./loader/css.loader";
import { lessLoader } from "./loader/less.loader";
import { sassLoader } from "./loader/sass.loader";
import { DefinePlugin } from "webpack";
import CopyPlugin from "copy-webpack-plugin";

export const webpackBaseConfig = {
  context: process.cwd(),
  mode: "production",
  entry: resolveFromRoot("src"),
  output: {
    path: resolveFromRoot("dist"),
    filename: "[name].[chunkhash:8].js",
    chunkFilename: "chunk/[name].[contenthash:8].js",
    publicPath: "./",
  },
  resolve: {
    alias: createAlias(),
    extensions: [".js", "jsx", "ts", "tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(t|j).sx?$/,
        use: [
          {
            loader: "esbuild-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [...cssLoader()],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [...sassLoader()],
      },
      {
        test: /\.less$/,
        use: [...lessLoader()],
      },
    ],
  },
  plugins: [
    new DefinePlugin(
      createDefineFromEnv({
        NODE_ENV: process.env.NODE_ENV,
      })
    ),
    new CopyPlugin({
      patterns: [
        {
          from: resolveFromRoot("src/public"),
          to: resolveFromRoot("dist/public"),
        },
      ],
    }),
  ],
};
