import Router from 'koa-router'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { getLoadableState } from 'loadable-components/server'

import createDocument from './_document'
import App from 'common/layout/App'

const router = new Router()

router.get('/bar', async (ctx) => {
  let modules = []

  const app = (
    <App ctx={ctx} />
  )

  const loadableState = await getLoadableState(app)

  let html = ReactDOMServer.renderToString(app)

  const scripts = loadableState.getScriptTag()

  ctx.body = createDocument({ scripts, html })
})

export default router