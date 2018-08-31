import hotMiddleware from 'webpack-hot-middleware'
import { PassThrough } from 'stream'

// SEE: https://github.com/shellscape/koa-webpack/issues/23#issuecomment-279609358
export default (compiler, opts) => {
  const expressMiddleware = hotMiddleware(compiler, opts)
  return async (ctx, next) => {
    let stream = new PassThrough()

    await expressMiddleware(ctx.req, {
      write: stream.write.bind(stream),
      writeHead: (status, headers) => {
        ctx.body = stream;
        ctx.status = status;
        ctx.set(headers)
      }
    }, next)
  }
}