var path = require('path');
module.exports = {
    entry: "./src/index",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
               test: /\.js$/,
               exclude: /node_modules/,
               loaders: ["babel"],
					include: path.join(__dirname, 'src')
            },
            {
               test: /\.json$/,
               loaders:["json-loader"]
            }
        ]
    }
};
