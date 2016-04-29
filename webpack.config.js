var path = require('path');
module.exports = {
    entry: {
		"./dist/react-dragndrop": "./src/index.es6",
		"./examples/simple/app": "./examples/simple/app.es6",
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
					include: [
						path.resolve(__dirname, 'src'),
						path.resolve(__dirname, 'examples/simple'),
						path.resolve(__dirname, 'examples/small_game')
					]
            }
        ]
    },
	 output: {
		filename: '[name].js',
  	}
};
