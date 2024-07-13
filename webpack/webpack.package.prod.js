const webpack = require('webpack')
const fs = require('fs')
const path = require('path')

const config = {
  mode: 'production',
  entry: path.resolve(__dirname, '../package/index.js'),
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
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ process: { env: JSON.stringify('prod') } }),
  ]
}

const configs = [
  Object.assign({}, config, {
    output: {
      filename: 'umd.min.js',
      path: path.resolve(__dirname, '../packaged'),
      libraryTarget: 'umd',
      library: 'CanvasXML',
      libraryExport: 'default'
    },
    optimization: {
      minimize: true
    }
  }),
  Object.assign({}, config, {
    output: {
      filename: 'umd.js',
      path: path.resolve(__dirname, '../packaged'),
      libraryTarget: 'umd',
      library: 'CanvasXML',
      libraryExport: 'default'
    },
    optimization: {
      minimize: false
    }
  }),
  Object.assign({}, config, {
    output: {
      filename: 'cmj.min.js',
      path: path.resolve(__dirname, '../packaged'),
      libraryTarget: 'commonjs'
    },
    optimization: {
      minimize: true
    }
  }),
  Object.assign({}, config, {
    output: {
      filename: 'cmj.js',
      path: path.resolve(__dirname, '../packaged'),
      libraryTarget: 'commonjs'
    },
    optimization: {
      minimize: false
    }
  }),
  Object.assign({}, config, {
    output: {
      filename: 'esm.min.js',
      path: path.resolve(__dirname, '../packaged'),
      libraryTarget: 'module'
    },
    optimization: {
      minimize: true
    },
    experiments: {
      outputModule: true,
    },
  }),
  Object.assign({}, config, {
    output: {
      filename: 'esm.js',
      path: path.resolve(__dirname, '../packaged'),
      libraryTarget: 'module'
    },
    optimization: {
      minimize: false
    },
    experiments: {
      outputModule: true,
    },
  }),
]

function deleteFolderRecursive(pathOuter) {
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

deleteFolderRecursive(path.resolve(__dirname, '../packaged'))

Promise.all(
  configs.map(i => new Promise(r => {
    webpack(i, (err, stats) => {
      if (err) throw err
      console.log(stats.toString({ colors: true, modules: true, children: true, chunks: true, chunkModules: true }))
      r()
    })
  }))
)