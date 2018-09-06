import React from 'react'
import { source } from 'common-tags'

export default ({ scripts, html }) => {
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
          
          ${scripts}
          <script src="/main.bundle.js"></script>
        </body>
      </html>
  `
}