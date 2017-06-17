const path = require('path');
const webpack = require('webpack');
// configure source and distribution folder paths
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
module.exports = {
	entry: {
		'app': ['babel-polyfill' ,'./index.jsx'],
		// the entry point of our app
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [ paths.appSource, paths.appModules ]
	},
	output: {
		filename: '[name].js',
		// the output bundle

		path: paths.appBuild,

		publicPath: '/'
			// necessary for HMR to know where to load the hot update chunks
	},

	context: paths.appSource,

	devtool: 'source-map',
	devServer: {

		contentBase: "dist",
    	historyApiFallback: true,
    	port: 8080
   	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			use: [
				{
					loader: 'babel-loader'
				},
				
			],
			exclude: /node_modules/
		},
		{
        test: /\.css$/,
	        use: [
	          { loader: "style-loader" },
	          { loader: "css-loader" }
	        ]
	      },{
	     test: /\.(gif|png|jpg)$/,
	     use: [ 'file-loader' ]
	  },
	  {
	     test: /\.(eot|ttf|woff|woff2|svg)$/,
	     use: [ 'url-loader' ]
	  }]
	},
	plugins:[
		 new HtmlWebpackPlugin({
            template: path.join(paths.appBuild, 'index.html')
        }),
	]
}