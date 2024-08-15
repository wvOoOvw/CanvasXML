const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = () => {
  return {
    mode: 'production',
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
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, './webpack.example.prod.html') }),
      new webpack.DefinePlugin({ process: { env: JSON.stringify('prod') } }),
    ]
  }
}

fs
  .readdirSync(path.resolve(__dirname, '../example'))
  .filter(i => fs.statSync(path.resolve(__dirname, `../example/${i}`)).isDirectory())
  .filter(i => i.startsWith('_') === false)
  .filter(i => process.argv.find(i => i.includes('path')) === undefined || process.argv.find(i => i.includes('path')).split('=')[1] === i)
  .forEach(i => {
    const wx = i.includes('WX')

    const iConfig = Object.assign({}, config(), {
      entry: path.resolve(__dirname, `../example/${i}/index.js`),
      output: {
        filename: 'index.[contenthash].js',
        path: path.resolve(__dirname, `../exampled/${i}`),
      },
    })

    if (wx) iConfig.output.filename = 'game.js'

    const deleteFolderRecursive = (pathOuter) => {
      if (fs.existsSync(pathOuter) === true) {
        fs.readdirSync(pathOuter).forEach(file => {
          const pathInner = path.resolve(pathOuter, './' + file)
          const isDirectory = fs.lstatSync(pathInner).isDirectory()
          if (isDirectory === true) deleteFolderRecursive(pathInner)
          if (isDirectory !== true) fs.unlinkSync(pathInner)
        })
        fs.rmdirSync(pathOuter)
      }
    }

    deleteFolderRecursive(path.resolve(__dirname, `../exampled/${i}`))

    if (fs.existsSync(path.resolve(__dirname, `../exampled`)) === false) fs.mkdirSync(path.resolve(__dirname, `../exampled`))

    fs.mkdirSync(path.resolve(__dirname, `../exampled/${i}`))

    if (wx) {
      fs.readdirSync(path.resolve(__dirname, `../example/${i}/config`)).forEach(n => {
        fs.copyFileSync(
          path.resolve(__dirname, `../example/${i}/config/${n}`),
          path.resolve(__dirname, `../exampled/${i}/${n}`),
        )
      })
    }

    if (wx) {
      iConfig.plugins = iConfig.plugins.filter(i => i instanceof HtmlWebpackPlugin !== true)
      iConfig.module.rules.forEach(i => i.use.forEach(i => i.loader === 'file-loader' ? i.options.publicPath = 'static' : null))
    }

    webpack(iConfig, (err, stats) => {
      if (err) throw err
      console.log(stats.toString({ colors: true, modules: true, children: true, chunks: true, chunkModules: true }))
    })
  })