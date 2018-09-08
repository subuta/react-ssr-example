import _ from 'lodash'
import isBrowser from '../../common/utils/isBrowser'

const KEY = '__PAGES__'

// Find page-components from `/pages`
export const fetchPages = () => {
  const glob = require('glob')

  const {
    PAGES_DIR
  } = require('../../../config')

  // Find directories from `/pages`
  const directories = _.map(glob.sync('**/', { cwd: PAGES_DIR }), (dir) => _.trimEnd(dir, '/'))

  // Find files from `/pages`
  const files = _.map(glob.sync('**/*.js', {
    cwd: PAGES_DIR,
    ignore: ['**/_*.js', '**/index.js', '404.js']
  }), (file) => _.trimEnd(file, '.js'))

  // Concat and normalize as path (eg: `/foo`)
  return _.map([...files, ...directories], (page) => `/${_.toLower(page)}`)
}

// Get pages.
export const getPages = () => {
  // Get pages from window if browser
  if (isBrowser) return _.get(window, [KEY], {})

  // Get pages by fetchPages otherwise.
  return fetchPages()
}

// Get pages and embed as window.${KEY}
export const getScriptTag = () => {
  const pages = fetchPages()
  return `<script>window.${KEY} = ${JSON.stringify(pages)};</script>`
}

export default fetchPages
