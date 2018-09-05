import React from 'react'
import { source } from 'common-tags'

export default ({ bundles, html }) => {
  console.log('bundles = ', bundles)
  return source`
    <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>React SSR and GraphQL Example</title>
        </head>
        <body>
          <div class="container">
              <h3>React SSR and GraphQL Example</h3>
          
              <div id="app">${html}</div>
          </div>
          
          ${bundles.map(bundle => {
            return `<script src="${bundle.publicPath}"></script>`
            // alternatively if you are using publicPath option in webpack config
            // you can use the publicPath value from bundle, e.g:
            // return \`<script src="${bundle.publicPath}"></script>\`
          }).join('\\n')
          }
          <script src="/main.bundle.js"></script>
        </body>
      </html>
  `
}