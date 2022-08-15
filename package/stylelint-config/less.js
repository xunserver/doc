module.exports = {
    extends: ['./css.js'],
    plugins: ['stylelint-less'],
    rules: {
        'less/color-hex-case': true,
        'less/color-no-hex': true,
        'less/color-no-invalid-hex': true,
        'less/no-duplicate-variables': true,
    }
}