// webpack.config.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client', 'src', 'main.js'),
  output: {
    path: path.join(__dirname, 'client', 'dist', 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: path.join(__dirname, 'client', 'src'),
      loader: 'babel-loader',
      query: {
        cacheDirectory: 'babel_cache',
        presets: ['react', 'es2015']
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: true,
      beautify: false,
      dead_code: true
    })
  ]
};
