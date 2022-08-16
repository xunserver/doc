module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "./base.js",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
  ],
};
