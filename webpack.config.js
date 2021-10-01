const { mode } = require('webpack-nano/argv');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');
const path = require('path');

const commonConfig = merge([
  { entry: ['./src'] },
  parts.page({ title: 'Demo' }),
  parts.loadTypeScript(),
  parts.extractCSS({ loaders: [parts.autoPrefix(), parts.tailwind()] }),
  parts.loadImages({ limit: 1500 }),
  parts.loadFont(),
  {
    output: {
      chunkFilename: 'chunk.[id].js',
    },
  },
]);

const productionConfig = merge([
  parts.eliminateUnusedCSS(),
  parts.loadJavaScript(),
  parts.generateSourceMaps({ type: 'source-map' }),
  {
    entry: {
      app: {
        import: path.join(__dirname, 'src', 'index.ts'),
        dependOn: 'vendor',
      },
      vendor: ['react', 'react-dom'],
    },
  },
]);

const developmentConfig = merge([
  { entry: ['webpack-plugin-serve/client'] },
  parts.devServer(),
]);

const getConfig = (mode) => {
  switch (mode) {
    case 'production':
      return merge(commonConfig, productionConfig, { mode });
    case 'development':
      return merge(commonConfig, developmentConfig, { mode });
    default:
      throw new Error(`Trying to use an unknown mode ${mode}`);
  }
};

module.exports = getConfig(mode);
