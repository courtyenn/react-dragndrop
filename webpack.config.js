var path = require('path');

module.exports = [
  {
    entry: {
      './lib/react-dragndrop': './src/index'
    },
    output: {
      path: path.resolve(__dirname),
      filename: '[name].js',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    externals: [{
			'react': 'React',
			'react-dom': 'ReactDom'
		}],
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
    }
  },
  {
    entry: {
      './examples/small_game/app': './examples/small_game/src/app'
    },
    output: {
      path: path.resolve(__dirname),
      filename: '[name].js',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    externals: [{
			'react': 'React',
			'react-dom': 'ReactDom',
			'./lib/react-slide-select': 'SlideSelect'
		}],
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
    }
  }
];
