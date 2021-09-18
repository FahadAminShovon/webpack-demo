const { merge } = require('webpack-merge');
const { common } = require('./webpack.common');

const productionConfig = merge([]);

module.exports = merge(common, productionConfig);
