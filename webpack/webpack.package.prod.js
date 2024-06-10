const path = require('path')

const common_ = {
  mode: 'production',
  entry: path.resolve(__dirname, '../package/index.js'),
  resolve: {
    extensions: ['.js', '.jsx'],
  }
}

module.exports = [
  Object.assign({}, common_, {
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
  Object.assign({}, common_, {
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
  Object.assign({}, common_, {
    output: {
      filename: 'cmj.min.js',
      path: path.resolve(__dirname, '../packaged'),
      libraryTarget: 'commonjs'
    },
    optimization: {
      minimize: true
    }
  }),
  Object.assign({}, common_, {
    output: {
      filename: 'cmj.js',
      path: path.resolve(__dirname, '../packaged'),
      libraryTarget: 'commonjs'
    },
    optimization: {
      minimize: false
    }
  }),
]