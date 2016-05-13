var path = require('path');
module.exports = {
  entry: {
    "./lib/index": "./src/index.es6",
    "./examples/small_game/app": "./examples/small_game/app.es6"
  },
  module: {
    debug: true,
    devtool: "source-map",
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          plugins: ['transform-runtime'],
          presets: ["es2015", "react"]
        },
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'examples/small_game')
        ]
      }
    ]
  },
  output: {
    filename: '[name].js',
  }
};
