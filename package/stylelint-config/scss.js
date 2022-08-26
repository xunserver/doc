module.exports = {
    extends: ['./css.js', 'stylelint-config-standard-scss', 'stylelint-config-prettier'],
    plugins: ['stylelint-scss'],
    rules: {
        'scss/at-import-no-partial-leading-underscore': [
          true,
          {
            severity: 'warning',
          },
        ],
        'annotation-no-unknown': [
          true,
          {
            severity: 'warning',
          },
        ],
    }
}