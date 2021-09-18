const { WebpackPluginServe } = require('webpack-plugin-serve');
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');

exports.devServer = () => ({
	watch: true,
	plugins: [
		new WebpackPluginServe({
			host: '127.0.0.1',
			port: process.env.port || 8080,
			static: './dist',
			liveReload: true,
			waitForBuild: true,
		}),
	],
});

exports.page = ({ title }) => ({
	plugins: [new MiniHtmlWebpackPlugin({ context: { title } })],
});
