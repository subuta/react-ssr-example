import Router from 'koa-router'

import renderAsync from 'lib/server/renderAsync'

const router = new Router()

router.get('*', async (ctx) => {
  ctx.body = await renderAsync(ctx.url)
})

export default router
