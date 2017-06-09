// webpack.config.js
const webpack = require('webpack')
const path = require('path')
const SplitByPathPlugin = require('webpack-split-by-path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [path.join(__dirname, 'client', 'src', 'main.js'), 'webpack-hot-middleware/client', 'webpack/hot/dev-server'],
  devtool: 'source-map',
  target: 'web',
  output: {
    path: '/',
    publicPath: 'http://localhost:3000/',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: path.join(__dirname, 'client', 'src'),
      loaders: ['react-hot-loader', 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0,cacheDirectory=babel_cache'],
      exclude: /node_modules/,
    }]
  },
  resolve: {
        extensions: ['.js', 'map']
  },
  plugins: [
    new SplitByPathPlugin([{
            name: 'vendor',
            path: path.join(__dirname, '..', 'node_modules')
    }]),
    new HtmlWebpackPlugin({
      title: 'Better Beehive Project',
      template: require('html-webpack-template'),
      inject: false,
      appMountId: 'app',
      filename: '../index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
