const webpack = require('webpack')
const path = require('path')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin")

const config = Object.assign({}, common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin({
      currentAssets: []
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './webpack.prod.html')
    }),
    new webpack.DefinePlugin({ process: { env: JSON.stringify('prod') } }),
  ]
})

if (process.argv.includes('--wx')) {
  config.output.path = path.resolve(__dirname, '../build-wx')
  config.module.rules.forEach(i => i.use.forEach(i => i.loader === 'file-loader' ? i.options.publicPath = 'static' : null))
  config.plugins = config.plugins.filter(i => i instanceof HtmlWebpackPlugin ? false : true)
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, './game.json'), to: config.output.path + '/game.json' },
        { from: path.join(__dirname, './project.config.json'), to: config.output.path + '/project.config.json' }
      ]
    })
  )
}

module.exports = config