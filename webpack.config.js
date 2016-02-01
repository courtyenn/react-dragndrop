var path = require('path');
module.exports = {
    entry: "./src/index",
    module: {
        loaders: [
            {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: "babel",
					include: path.join(__dirname, 'src')
            }
        ]
    },
	 output: {
	    filename: 'dist/react-dragndrop.js',
	    libraryTarget: 'umd',
	    library: 'react-dragndrop'
  },
};
