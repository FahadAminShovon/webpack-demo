const { mode } = require('webpack-nano/argv');
const { page } = require('./parts');
const { merge } = require('webpack-merge');

exports.common = merge([
	{ mode },
	{ entry: ['./src'] },
	page({ title: 'Demo' }),
]);
