module.exports = {
  extends: ['./base.js'],
  overrides: [
    {
      files: ['*.ts', 'tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        // "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
    },
  ],
}
