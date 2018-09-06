import Koa from 'koa'
import logger from 'koa-logger'
import koaBody from 'koa-body'
import serve from 'koa-static'
import clearModule from 'clear-module'
import path from 'path'

import {
  ROOT_DIR,
  PUBLIC_DIR,
  WEBPACK_CONFIG_PATH
} from '../../config'

const {
  PORT
} = process.env

const port = parseInt(PORT, 10) || 5000
const app = new Koa()

// log requests
app.use(logger())

// parse body
app.use(koaBody())

// detect is dev
const dev = process.env.NODE_ENV !== 'production'

if (dev) {
  const webpack = require('webpack')
  const config = require(WEBPACK_CONFIG_PATH)
  const { devMiddleware } = require('koa-webpack-middleware')
  const hotMiddleware = require('./middlewares/webpack-hot-middleware').default
  const compiler = webpack(config)

  app.use(devMiddleware(compiler, {
    noInfo: true,
    // logLevel: 'silent',
    publicPath: config.output.publicPath
  }))

  app.use(hotMiddleware(compiler, {
    // log: false
  }))

  // Server side hot-module-replacement :)
  const watcher = require('sane')(path.resolve(ROOT_DIR, './src'))
  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log('Clearing src module cache from server')
      clearModule.match(/src/)
    })
  })
}

// Register views routes/allowedMethods
if (dev) {
  // Dynamic import modules for development(With no-module-cache).
  // SEE: https://github.com/glenjamin/ultimate-hot-reloading-example/blob/master/server.js
  app.use((...args) => require('./views').default.routes().apply(null, args))
  app.use((...args) => require('./views').default.allowedMethods().apply(null, args))
} else {
  // Use modules statically otherwise (prod/test).
  const views = require('./views').default
  app.use(views.routes())
  app.use(views.allowedMethods())
}

// otherwise PUBLIC_DIR
app.use(serve(PUBLIC_DIR))

// Serve the files on port.
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})