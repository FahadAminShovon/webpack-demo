const { WebpackPluginServe } = require('webpack-plugin-serve');
module.exports = () => ({
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
