import Router from 'koa-router'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { getLoadableState } from 'loadable-components/server'

import createDocument from './_document'
import createApp from 'common/utils/createApp'

const router = new Router()

router.get('*', async (ctx) => {
  const app = createApp(ctx)

  const loadableState = await getLoadableState(app)

  let html = ReactDOMServer.renderToString(app)

  const scripts = loadableState.getScriptTag()

  ctx.body = createDocument({ scripts, html })
})

export default router