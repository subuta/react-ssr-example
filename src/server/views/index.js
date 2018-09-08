import React from 'react'

import Router from 'koa-router'
import { StaticRouter } from 'react-router-dom'

import App from 'common/layout/App'
import renderAsync from './renderAsync'

const router = new Router()

router.get('*', async (ctx) => {
  const routerContext = {}

  const app = (
    <StaticRouter context={routerContext} location={ctx.url}>
      <App />
    </StaticRouter>
  )

  ctx.body = await renderAsync(app, ctx)
})

export default router
