var path = require('path');
module.exports = {
    entry: {
		"./dist/react-dragndrop": "./src/index",
		"./examples/app": "./examples/app.es6"
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
						path.resolve(__dirname, 'examples')
					]
            }
        ]
    },
	 output: {
		filename: '[name].js',
  	}
};
