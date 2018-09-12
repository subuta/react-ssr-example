import Router from 'koa-router'

import {
  syncPages
} from 'lib/syncPages'

import renderAsync from 'lib/server/renderAsync'

// Seek and sync common/pages.
syncPages()

const router = new Router()

router.get('*', async (ctx) => {
  ctx.body = await renderAsync(ctx.url)
})

export default router
