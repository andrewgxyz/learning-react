import webpack from 'webpack'
import webpackConfig from './../webpack.config.client'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const compile = (app) => {
  if (process.env.NODE_ENV == 'development') {
    const compiler = webpack(webpackConfig)
    const middleware = webpackMiddleware(compiler, {publicPath: webpackConfig.output.publicPath})

    app.use(middleware)
    app.use(webpackHotMiddleware(compiler))
  }
}

export default {
  compile
}
