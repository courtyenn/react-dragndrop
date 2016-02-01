var path = require('path');
module.exports = {
    entry: "./src/index",
    module: {
        loaders: [
            {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: "babel",
					include: [
						path.resolve(__dirname, 'src')
					]
            }
        ]
    },
	 output: {
	    filename: 'dist/react-dragndrop.js',
	    library: 'react-dragndrop'
  },
};
