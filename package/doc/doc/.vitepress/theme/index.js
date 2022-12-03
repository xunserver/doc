import DefaultTheme from "vitepress/theme";
import Vui from "@xunserver/vui";
import Icon from "@xunserver/icon-vue";

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.use(Vui);
    ctx.app.use(Icon);
  },
};
