import DefaultTheme from "vitepress/theme";
import Vui from "@xunserver/vui";

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.use(Vui);
  },
};
