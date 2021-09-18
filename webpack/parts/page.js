const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');

module.exports = ({ title }) => ({
	plugins: [new MiniHtmlWebpackPlugin({ context: { title } })],
});
