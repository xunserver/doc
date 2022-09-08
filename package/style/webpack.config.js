const { resolve, relative } = require('path')
const fs = require('fs')
const shelljs = require('shelljs')

shelljs.rm('-rf', './dist')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const loadComponent = (dir) => {
  const files = fs.readdirSync(dir)
  return files.reduce((result, file) => {
    if (file.endsWith('.less') && file !== 'index.less') {
      const noExtFileName = file.substring(0, file.lastIndexOf('.'))
      result[noExtFileName] = `${dir}/${file}`
    }
    return result
  }, {})
}

module.exports = {
  entry: {
    index: './src/index.less',
    ...loadComponent('./src/component'),
  },
  output: {
    path: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: {
              additionalData: (fileContent, loaderContext) => {
                const { resourcePath, rootContext } = loaderContext
                const relativePath = relative(rootContext, resourcePath)
                if (relativePath.includes('component')) {
                  return `@import '../common'; ${fileContent}`
                }

                return fileContent
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
}
