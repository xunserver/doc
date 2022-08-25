module.exports = {
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@babel/eslint-parser',
        ...(require('./babel').parserOptions || {}),
      },
      extends: ['plugin:vue/vue2-recommended'],
    },
  ],
  extends: ['./babel'],
}
