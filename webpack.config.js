// webpack.config.js
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'client', 'src', 'main.js'),
  output: {
    path: path.join(__dirname, 'client', 'dist', 'js'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: path.join(__dirname, 'client', 'src'),
      loader: 'babel-loader',
      query: {
        cacheDirectory: 'babel_cache',
        presets: ['react', 'es2015', 'stage-0'],
      },
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Better Beehive Project',
      template: 'client/index.ejs',
      inject: false,
      appMountId: 'app',
      filename: '../index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: true,
      beautify: false,
      dead_code: true,
    }),
  ],
}
