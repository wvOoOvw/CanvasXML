const open = require('open')
const webpack = require('webpack')

if (process.argv.includes('--example') && process.argv.includes('--dev')) {
  const webpackConfig = require('./webpack.example.dev')

  const WebpackDevServer = require('webpack-dev-server')
  const app = new WebpackDevServer({ port: 8000, open: true }, webpack(webpackConfig))
  app.start().then(err => {
    if (err) throw err
  })
}

if (process.argv.includes('--example') && process.argv.includes('--prod')) {
  const webpackConfig = require('./webpack.example.prod')

  webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    console.log(stats.toString({ colors: true, modules: true, children: true, chunks: true, chunkModules: true }))
  })
}

if (process.argv.includes('--package') && process.argv.includes('--prod')) {
  const webpackConfig = require('./webpack.package.prod')

  Promise.all(
    webpackConfig.map(i => new Promise(r => {
      webpack(i, (err, stats) => {
        if (err) throw err
        console.log(stats.toString({ colors: true, modules: true, children: true, chunks: true, chunkModules: true }))
        r()
      })
    }))
  )
}