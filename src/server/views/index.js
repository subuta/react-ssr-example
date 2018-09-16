import Router from 'koa-router'

import { asyncRenderToString } from 'lib'

const router = new Router()

router.get('*', async (ctx) => {
  ctx.body = await asyncRenderToString(ctx.url)
})

export default router
