import Koa from 'koa'
import logger from 'koa-logger'
import koaBody from 'koa-body'
import send from 'koa-send'
import e2k from 'express-to-koa'
import clearModule from 'clear-module'
import path from 'path'

import TwitterCard from '../common/components/TwitterCard'

console.log(TwitterCard)

import {
  ROOT_DIR,
  PUBLIC_DIR
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
  const webpackDevMiddleware = require('webpack-dev-middleware')

  const config = require('../../webpack.config.js')
  const compiler = webpack(config)

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(e2k(webpackDevMiddleware(compiler, {
    noInfo: true,
    logLevel: 'silent',
    publicPath: config.output.publicPath
  })))

  app.use(e2k(require('webpack-hot-middleware')(compiler, {
    log: false
  })))

  // Server side hot-module-replacement :)
  const watcher = require('sane')(path.resolve(ROOT_DIR, './src/server'))
  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log('Clearing /server module cache from server')
      clearModule.match(/src\/server/)
    })
  })
}

// // Register pages routes/allowedMethods
// if (dev) {
//   // Dynamic import modules for development(With no-module-cache).
//   // SEE: https://github.com/glenjamin/ultimate-hot-reloading-example/blob/master/server.js
//   app.use((...args) => require('./server/routes').default.routes().apply(null, args))
//   app.use((...args) => require('./server/routes').default.allowedMethods().apply(null, args))
// } else {
//   // Use modules statically otherwise (prod/test).
//   const routes = require('./server/routes').default
//   app.use(routes.routes())
//   app.use(routes.allowedMethods())
// }

// otherwise PUBLIC_DIR
app.use(async (ctx) => {
  await send(ctx, ctx.path, {root: PUBLIC_DIR, index: 'index.html'})
})

// Serve the files on port 3000.
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
