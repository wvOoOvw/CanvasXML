if (process.argv.includes('--example') && process.argv.includes('--dev')) {
  require('./webpack.example.dev')
}

if (process.argv.includes('--example') && process.argv.includes('--prod')) {
  require('./webpack.example.prod')
}

if (process.argv.includes('--package') && process.argv.includes('--prod')) {
  require('./webpack.package.prod')
}