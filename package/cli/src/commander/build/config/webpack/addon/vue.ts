import { OriginConfig } from "src/config";
import { VueLoaderPlugin } from "vue-loader";

export const vueAddon = (options?) => {
  return (webpackBaseConfig, originConfig: OriginConfig) => {
    if (originConfig.type !== 'vue') {
      return {}
    }
    return {
      resolve: {
        extensions: [".vue"],
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            use: [
              {
                loader: "vue-loader",
              },
            ],
          },
        ],
      },
      plugins: [new VueLoaderPlugin()],
    };
  };
};
