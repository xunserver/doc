import { createAlias } from "../../util/alias";
import { createDefineFromEnv } from "../../../../utils/env";
import {
  resolveFromProjectRoot,
  resolveFromCliRoot,
} from "../../../../utils/path";
import { cssLoader } from "./loader/css.loader";
import { lessLoader } from "./loader/less.loader";
import { sassLoader } from "./loader/sass.loader";
import { DefinePlugin } from "webpack";
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const webpackBaseConfig = {
  context: process.cwd(),
  mode: "production",
  entry: resolveFromProjectRoot("src"),
  output: {
    path: resolveFromProjectRoot("dist"),
    filename: "[name].[chunkhash:8].js",
    chunkFilename: "chunk/[name].[contenthash:8].js",
    publicPath: "./",
    clean: true,
  },
  resolve: {
    alias: createAlias(),
    extensions: [".js", "jsx", "ts", "tsx"],
  },
  resolveLoader: {
    modules: ["node_modules", resolveFromCliRoot("node_modules")],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
          from: resolveFromProjectRoot("src/public"),
          to: resolveFromProjectRoot("dist/public"),
        },
      ],
    }),
    new MiniCssExtractPlugin(),
  ],
};
