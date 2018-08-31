import Router from 'koa-router'
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../../front/App';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'

import _ from 'lodash'
import path from 'path'
import fs from 'fs'

import {
  ROOT_DIR,
  TMP_DIR
} from '../../../config'

const router = new Router()

const stats = JSON.parse(fs.readFileSync(path.resolve(TMP_DIR, './react-loadable.json')) || '')

router.get('/', async (ctx) => {
  let modules = [];

  let html = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <App/>
    </Loadable.Capture>
  );

  // Remove empty and uniqBy filename.
  let bundles = _.uniqBy(_.compact(getBundles(stats, modules)), bundle => bundle.file);
  // Remove extra sourcemap.
  bundles = _.reject(bundles, bundle => _.endsWith(bundle.file, '.map'))

  ctx.body = `
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
              // return `<script src="${bundle.publicPath}"></script>`
          }).join('\n')
        }
        <script src="/main.bundle.js"></script>
      </body>
    </html>
  `
})

router.get('/hoge', async (ctx) => {
  ctx.body = {
    hoge: 'fuga'
  }
})

export default router