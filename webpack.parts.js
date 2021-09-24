const { WebpackPluginServe } = require('webpack-plugin-serve');
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

const ALL_FILES = glob.sync(path.join(__dirname, 'src/*.js'));

exports.devServer = () => ({
  watch: true,
  plugins: [
    new WebpackPluginServe({
      host: '127.0.0.1',
      port: process.env.PORT || 8080,
      static: './dist',
      liveReload: true,
      waitForBuild: true,
    }),
  ],
});

exports.page = ({ title }) => ({
  plugins: [new MiniHtmlWebpackPlugin({ context: { title } })],
});

exports.loadCSS = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
});

exports.extractCSS = ({ options = {}, loaders = [] } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, options },
          {
            loader: 'css-loader',
          },
        ].concat(loaders),
        sideEffects: true,
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: '[name].css' })],
});

exports.tailwind = () => ({
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [require('tailwindcss')],
    },
  },
});

exports.autoPrefix = () => ({
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [require('autoprefixer')],
    },
  },
});

exports.eliminateUnusedCSS = () => ({
  plugins: [
    new PurgeCSSPlugin({
      paths: ALL_FILES,
      extractors: [
        {
          extractor: (content) =>
            content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ['html'],
        },
      ],
    }),
  ],
});

exports.loadImages = ({ limit } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpeg|svg|jpg)$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: limit } },
      },
    ],
  },
});

exports.loadFont = () => ({
  module: {
    rules: [
      {
        test: /\.(ttf|woff|eot|woff2)$/,
        type: 'asset/resource',
      },
    ],
  },
});
