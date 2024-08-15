const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevServer = require('webpack-dev-server')

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(__dirname, `../example/${process.argv.find(i => i.includes('path')).split('=')[1]}/index.js`),
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
        test: /\.(png|jpg|jpeg|gif|mp3|m4a|glb|svg|ogg)$/i,
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './webpack.example.dev.html')
    }),
    new webpack.DefinePlugin({ process: { env: JSON.stringify('dev') } })
  ]
}

const app = new WebpackDevServer({
  port: 8000,
  open: true,
  client: {
    overlay: false,
  },
}, webpack(config))

app.start().then(err => {
  if (err) throw err
})