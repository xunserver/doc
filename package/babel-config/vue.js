module.exports = (_, options) => {
    const {
      typescript = false,
      envOptions = {},
      vueOptions = {},
      typescriptOptions = {},
    } = options;
    const presets = [
      [
        "@babel/preset-env",
        {
          corejs: 3,
          useBuiltIns: 'usage',
          ...envOptions,
        },
      ],
      [
        '@vue/babel-preset-jsx', {
          ...vueOptions
        }
      ]
    ];
  
    const plugins = [
      [
        "@babel/plugin-transform-runtime",
        {
          corejs: 3,
        },
      ],
    ];
  
    if (typescript) {
      presets.push([
          '@babel/preset-typescript', {
              allExtensions: true,
              ...typescriptOptions
          }
      ]);
    }
  
    return {
      presets,
      plugins
    }
  };
  