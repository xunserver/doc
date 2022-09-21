const { cssLoader, sassLoader, lessLoader } = require("../loader");

module.exports = {
  resolve: {
    alias: getAlias(),
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
      genDefinePluginEnv({
        NODE_ENV: process.env.NODE_ENV,
      })
    ),
  ],
};
