const webpack = require("webpack");
module.exports = {
    output: {
        path: require("path").resolve("./src/js/srcJS"),
        filename: 'main.js'
    },
    // externals: {
    //     jquery: "jQuery"
    // },
    module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	// devtool: '#inline-source-map'
};