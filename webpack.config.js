var path = require('path');

module.exports = {
  entry: {
    "./lib/index": "./src/index",
    "./examples/small_game/index": "./examples/small_game/app"
  },
  module: {
    debug: true,
    devtool: "source-map",
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: "babel",
        query: {
          plugins: ['transform-runtime'],
          presets: ["es2015", "react"]
        }
      }
    ]
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'umd'
  }
};
