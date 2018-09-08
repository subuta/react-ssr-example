import _ from 'lodash'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { getLoadableState } from 'loadable-components/server'
import {
  getScriptTag as getPagesScriptTag
} from 'common/utils/fetchPages'

import {
  getScriptTag as getInitialPropsScriptTag
} from 'common/utils/initialProps'

import { source } from 'common-tags'

export default async (app, ctx) => {
  const loadableState = await getLoadableState(app)

  const html = renderToString(app)
  const helmet = Helmet.renderStatic()

  const loadableStateScript = loadableState.getScriptTag()
  const initialPropsScript = getInitialPropsScriptTag(ctx)
  const pagesScript = getPagesScriptTag()

  return source`
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
          ${pagesScript}
          <script src="/main.bundle.js"></script>
        </body>
    </html>
  `
}
