const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  mode: 'production',
  entry: path.resolve(__dirname, '../example/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../build')
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
    new CleanWebpackPlugin({
      currentAssets: []
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './webpack.example.prod.html')
    }),
    new webpack.DefinePlugin({ process: { env: JSON.stringify('prod') } }),
  ]
}

module.exports = config