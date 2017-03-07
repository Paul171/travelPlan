const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8081', // WebpackDevServer host and port
		'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
		'./index.jsx'
		// the entry point of our app
	],
	resolve: {
		extensions: ['.js', '.jsx']
	},
	output: {
		filename: 'bundle.js',
		// the output bundle

		path: path.resolve(__dirname, 'dist'),

		publicPath: '/'
			// necessary for HMR to know where to load the hot update chunks
	},

	context: path.resolve(__dirname, 'src'),

	devtool: 'eval',
	devServer: {

		hot: true,
		// enable HMR on the server

		contentBase: path.join(__dirname, 'dist'),
		// match the output path
		inline: true,
		publicPath: '/'
			// match the output `publicPath`
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			use: [
				{
					loader: 'react-hot-loader'
				},
				{
					loader: 'babel-loader',
					options: {
						presets:['react','es2015','stage-0']
					}
				},
				
			],
			include: path.join(__dirname, 'src'),
			exclude: /node_modules/
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}