// webpack.dev.config.js
const webpack = require('webpack')
const path = require('path')
const SplitByPathPlugin = require('webpack-split-by-path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    path.join(__dirname, 'client', 'src', 'main.js'),
    'webpack-hot-middleware/client',
    'webpack/hot/dev-server',
  ],
  devtool: 'source-map',
  target: 'web',
  output: {
    path: '/',
    publicPath: 'http://localhost:3000/',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'client', 'src'),
        loaders: [
          'react-hot-loader',
          'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0,plugins[]=transform-decorators-legacy,cacheDirectory=babel_cache',
        ],
        exclude: /node_modules/,
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
    ],
  },
  resolve: {
    extensions: ['.js', 'map'],
  },
  plugins: [
    new SplitByPathPlugin([
      {
        name: 'vendor',
        path: path.join(__dirname, '..', 'node_modules'),
      },
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      title: 'Better Beehive Project',
      template: 'client/index.dev.ejs',
      inject: false,
      appMountId: 'app',
      filename: '../index.html',
      placesApiKey: process.env.GOOGLE_PLACES_API_KEY,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
