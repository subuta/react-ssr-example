const path = require('path')
const ROOT_DIR = __dirname
const SRC_DIR = path.resolve(ROOT_DIR, './src')
const FRONT_DIR = path.resolve(SRC_DIR, './front')
const DIST_DIR = path.resolve(ROOT_DIR, './dist')
const PUBLIC_DIR = path.resolve(ROOT_DIR, './public')

module.exports = {
  ROOT_DIR,
  SRC_DIR,
  FRONT_DIR,
  DIST_DIR,
  PUBLIC_DIR
}