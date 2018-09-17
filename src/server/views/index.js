import Router from 'koa-router'

import { asyncRenderToString } from 'lib/server'
import Pages from 'src/pages'

const router = new Router()

router.get('*', async (ctx) => {
  ctx.body = await asyncRenderToString(Pages, ctx.url)
})

export default router
