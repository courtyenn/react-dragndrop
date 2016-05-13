var path = require('path');

module.exports = {
  entry: {
    './lib/react-dragndrop': './src/index'
  },
  module: {
    debug: true,
    devtool: 'source-map',
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'react-dragndrop',
    sourceMapFilename: '[name].map',
    umdNamedDefine: true
  }
};
