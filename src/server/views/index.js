import Router from 'koa-router'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import resolve from 'resolve'

import _ from 'lodash'
import path from 'path'
import fs from 'fs'

import createDocument from './_document'
import App from '../../common/layout/App'

import {
  SRC_DIR,
  TMP_DIR
} from '../../../config'

const router = new Router()

// Get stats from react-loadable.
const stats = JSON.parse(fs.readFileSync(path.resolve(TMP_DIR, './react-loadable.json')) || '')

// OK
// modules =  [ '../pages/bar.js' ]
// stats =  [ './pages/bar.js' ]
// getBundles(stats, modules) =  [ { id: './common/pages/bar.js',
//   name: './common/pages/bar.js',
//   file: '0.bundle.js',
//   publicPath: '/0.bundle.js' },
//   { id: './common/pages/bar.js',
//     name: './common/pages/bar.js',
//     file: '0.bundle.js.map',
//     publicPath: '/0.bundle.js.map' } ]
// bundles =  [ { id: './common/pages/bar.js',
//   name: './common/pages/bar.js',
//   file: '0.bundle.js',
//   publicPath: '/0.bundle.js' } ]

// NG
// modules =  [ '../pages/bar.js' ]
// stats =  [ '/Users/subuta/repo/react-ssr-gql-example/pages/bar.js' ]
// getBundles(stats, modules) =  [ undefined ]
// bundles =  []

router.get('*', async (ctx) => {
  let modules = []

  // Render & Capture modulesNames for react-loadable.
  let html = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <App ctx={ctx} />
    </Loadable.Capture>
  )

  console.log('modules = ', modules)
  // modules = [resolve.sync(`./${modules[0]}`, { basedir: SRC_DIR })]
  // console.log('modules[0] = ', modules[0])
  // console.log('modules = ', resolve.sync(`./${modules[0]}`, { basedir: SRC_DIR }))
  console.log('stats = ', _.filter(_.keys(stats), (key) => {
    return _.includes(key, 'bar')
  }))
  console.log(`getBundles(stats, modules) = `, getBundles(stats, ['./pages/bar.js']))

  // Remove empty and uniqBy filename.
  let bundles = _.uniqBy(_.compact(getBundles(stats, ['./pages/bar.js'])), bundle => bundle.file)

  // Remove extra sourcemap.
  bundles = _.reject(bundles, bundle => _.endsWith(bundle.file, '.map'))

  ctx.body = createDocument({ bundles, html })
})

export default router