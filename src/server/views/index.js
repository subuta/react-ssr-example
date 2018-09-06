import Router from 'koa-router'

import createApp from 'common/utils/createApp'
import renderAsync from './renderAsync'

const router = new Router()

router.get('*', async (ctx) => {
  const app = createApp(ctx)
  ctx.body = await renderAsync(app, ctx)
})

export default router
