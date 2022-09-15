import { optimize, OptimizeOptions } from "svgo";

export const svgoConfig: OptimizeOptions = {
  floatPrecision: 2,
  plugins: [
    {
      name: "removeAttrs",
      params: {
        attrs: "(fill|class)",
      },
    },
  ],
};

export const svgo = (content: string) =>
  (optimize(content, svgoConfig) as any).data;
