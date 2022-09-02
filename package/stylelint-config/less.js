module.exports = {
    extends: ['./css.js', 'stylelint-config-recommended-less'],
    overrides: [
        {
          files: ["**/*.less"],
          customSyntax: "postcss-less",
        },
    ],
    plugins: ['stylelint-less']
}