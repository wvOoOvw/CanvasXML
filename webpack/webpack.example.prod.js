const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
  mode: 'production',
  entry: path.resolve(__dirname, '../example/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../exampled')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          },
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|mp3|m4a|glb|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ currentAssets: [] }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, './webpack.example.prod.html') }),
    new webpack.DefinePlugin({ process: { env: JSON.stringify('prod') } }),
  ]
}

const dir = fs
  .readdirSync(path.resolve(__dirname, '../example'))
  .filter(i => fs.statSync(path.resolve(__dirname, `../example/${i}`)).isDirectory())
  .filter(i => i.startsWith('_') === false)

const configs = dir.map(i => {
  return Object.assign({}, config, {
    entry: path.resolve(__dirname, `../example/${i}/index.js`),
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, `../exampled/${i}`),
    },
  })
})

module.exports = configs