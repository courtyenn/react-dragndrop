var path = require('path');

module.exports = {
  entry: {
    "./lib/react-dragndrop": "./src/index",
    "./examples/small_game/index": "./examples/small_game/app"
  },
  devtool: "source-map",
  target: "web",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: "babel-loader",
        query: {
          plugins: [['transform-runtime', {
            "polyfill": false,
            "regenerator": true
          }]],
          presets: ["es2015", "react"]
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
