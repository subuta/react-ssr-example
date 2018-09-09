import React from 'react'
import { source } from 'common-tags'
import _ from 'lodash'

import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { getLoadableState } from 'loadable-components/server'

import Router from 'koa-router'
import { StaticRouter } from 'react-router-dom'

import {
  getInitialPropsFromComponent,
  rememberInitialProps,
  getScriptTag as getInitialPropsScriptTag
} from 'common/utils/initialProps'

import App from 'common/layout/App'
import { Pages } from 'common/pages'

const router = new Router()

router.get('*', async (ctx) => {
  const app = (
    <StaticRouter context={{ ctx }} location={ctx.url}>
      <App />
    </StaticRouter>
  )

  // Wait for loadable-components.
  const loadableState = await getLoadableState(app)

  const Page = _.get(Pages, ctx.url, null)
  if (Page) {
    // Call getInitialProps of Page if defined.
    // Fetch initialProps and remember it in ctx.
    const initialProps = await getInitialPropsFromComponent(Page)
    rememberInitialProps({ [ctx.url]: initialProps }, ctx)
  }

  const html = renderToString(app)
  const helmet = Helmet.renderStatic()

  const loadableStateScript = loadableState.getScriptTag()
  const initialPropsScript = getInitialPropsScriptTag(ctx)

  ctx.body = source`
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.base.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            ${helmet.style.toString()}
            ${helmet.script.toString()}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
          <div class="container">
            <h3>React SSR Example</h3>
        
            <div id="app">${html}</div>
          </div>
          
          ${loadableStateScript}
          ${initialPropsScript}
          <script src="/main.bundle.js"></script>
        </body>
    </html>
  `
})

export default router
