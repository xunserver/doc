import { OriginConfig } from "src/config";

export const typescriptAddon = (options?) => {
  return (webpackBaseConfig, originConfig: OriginConfig) => {
    if (!originConfig.typescript) {
      return {}
    }
    return {
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: "esbuild-loader",
                options: {
                  loader: "tsx",
                  target: "es6",
                }
              },
            ],
          },
        ],
      }
    };
  };
};
