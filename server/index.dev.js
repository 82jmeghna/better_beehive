const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackconfig = require('../webpack.dev.config.js')
const webpackcompiler = webpack(webpackconfig)

// enable webpack middleware for hot-reloads in development
function useWebpackMiddleware(app) {
  app.use(webpackDevMiddleware(webpackcompiler, {
    publicPath: webpackconfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
      'errors-only': true,
    },
  }))
  app.use(webpackHotMiddleware(webpackcompiler, {
    log: console.log, // eslint-disable-line no-console
  }))

  return app
}

module.exports = {
  useWebpackMiddleware: useWebpackMiddleware,
}
