import _ from 'lodash'
import glob from 'glob'
import fs from 'fs'
import path from 'path'
import { source } from 'common-tags'

import {
  PAGES_DIR
} from '../../../config'

import dev from 'common/utils/dev'

const PAGES_INDEX_TEMPLATE_FILE = path.resolve(PAGES_DIR, './index.template.js')
const PAGES_INDEX_FILE = path.resolve(PAGES_DIR, './index.js')

if (dev) {
  // Watch for common/pages changes.
  const watcher = require('sane')(PAGES_DIR, { ignored: ['./index.js'] })

  const onChange = () => {
    console.log('Detect changes at common/pages')
    syncPages()
  }

  watcher.on('ready', () => {
    watcher.on('add', onChange)
    watcher.on('delete', onChange)
  })
}

// Find page-components from `/pages`
export const fetchPages = () => {
  // Find directories from `/pages`
  const directories = _.map(glob.sync('**/', { cwd: PAGES_DIR }), (dir) => _.trimEnd(dir, '/'))

  // Find files from `/pages`
  const files = _.map(glob.sync('**/*.js', {
    cwd: PAGES_DIR,
    ignore: ['**/_*.js', '**/index.js', '404.js', 'index.template.js']
  }), (file) => _.trimEnd(file, '.js'))

  // Concat and normalize as path (eg: `/foo`)
  return _.map([...files, ...directories], (page) => `/${_.toLower(page)}`)
}

// Inject found pages into `common/pages/index.js`
export const syncPages = () => {
  let template = fs.readFileSync(PAGES_INDEX_TEMPLATE_FILE, 'utf8')

  const pages = fetchPages()

  const getPageName = (page) => _.upperFirst(_.camelCase('Page' + page))

  const defs = _.map(pages, (page) => (
    `const ${getPageName(page)} = loadable(async () => import('.${page}').catch(onImportError), { render: renderLoadable })`
  )).join('\n')

  const Pages = source`
    ${defs}
    
    export const Pages = {
      ${_.map(pages, (page) => (source`
        '${page}': ${getPageName(page)}
      `)).join(',\n')}
    }`

  template = template.replace(/export const Pages = \[]/g, `${Pages}`)

  fs.writeFileSync(PAGES_INDEX_FILE, template, { encoding: 'utf8' })

  console.log('pages = ', pages)
}

export default syncPages
