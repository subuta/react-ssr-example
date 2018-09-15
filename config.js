const path = require('path')
const ROOT_DIR = process.cwd()
const SRC_DIR = path.resolve(ROOT_DIR, './src')
const LIB_DIR = path.resolve(ROOT_DIR, './lib')
const FRONT_DIR = path.resolve(SRC_DIR, './front')
const PAGES_DIR = path.resolve(SRC_DIR, './pages')
const DIST_DIR = path.resolve(ROOT_DIR, './dist')
const DIST_LIB_DIR = path.resolve(ROOT_DIR, './distLib')
const PUBLIC_DIR = path.resolve(ROOT_DIR, './public')
const WEBPACK_CONFIG_PATH = path.resolve(ROOT_DIR, './webpack.config.js')

module.exports = {
  ROOT_DIR,
  SRC_DIR,
  LIB_DIR,
  FRONT_DIR,
  PAGES_DIR,
  DIST_DIR,
  DIST_LIB_DIR,
  PUBLIC_DIR,
  WEBPACK_CONFIG_PATH
}
