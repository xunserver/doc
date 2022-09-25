import { createAlias } from "../util/alias";
import { createDefineFromEnv } from "../util/env";
import { resolveFromRoot } from "../util/path";
import { cssLoader } from "./loader/css.loader";
import { lessLoader } from "./loader/less.loader";
import { sassLoader } from "./loader/sass.loader";

export const webpackBaseConfig = {
  context: process.cwd(),
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
  plugin: [
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
