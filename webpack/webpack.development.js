const { merge } = require('webpack-merge');
const { common } = require('./webpack.common');
const { devServer } = require('./webpack.parts');

const developmentConfig = merge([
	{
		entry: ['webpack-plugin-serve/client'],
	},
	devServer(),
]);

module.exports = merge(common, developmentConfig);
