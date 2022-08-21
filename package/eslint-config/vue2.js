module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  extends: [require.resolve("./recommended"), "plugin:vue/vue-recommended"],
};
