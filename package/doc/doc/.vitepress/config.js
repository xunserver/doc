import { defineConfig } from "vitepress";

export default defineConfig({
  themeConfig: {
    siteTitle: "xunserver",
    nav: [
      {
        link: "/cli",
        text: "@xunserver/cli",
      },
      {
        link: "/style",
        text: "@xunserver/ui",
      },
      {
        text: "lint",
        items: [
          {
            text: "eslint",
            link: "/eslint-config",
          },
          {
            text: "stylelint",
            link: "/stylelint-config",
          },
          {
            text: "prettier",
            link: "/prettier-config",
          },
          {
            text: "commitlint",
            link: "/commitlint-config",
          },
          {
            text: "vscode",
            link: "/vscode",
          },
        ],
      },
      {
        text: "babel",
        items: [
          { link: "/babel", text: "babel" },
          {
            link: "/postcss",
            text: "postcss",
          },
        ],
      },
    ],
  },
});
