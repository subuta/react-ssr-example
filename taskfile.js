import {
  PUBLIC_DIR,
  DIST_DIR,
  DIST_LIB_DIR
} from './config'

const src = {
  copy: [
    'src/front/**/*.!(js)'
  ]
}

const dist = {
  p: PUBLIC_DIR,
  d: DIST_DIR,
  dLib: DIST_LIB_DIR
}

// Clear dist.
export async function clear (task) {
  await task.clear([dist.p, dist.d, dist.dLib])
}

// Copy front-end files.
export async function copy (task) {
  await task.source(src.copy).target(dist.p)
}

// Do build pages manually(for Production).
export async function buildPages (task) {
  await task.source('src').shell('NODE_ENV=production node lib/cli sync-pages')
}

// Do build front-end(for Production).
export async function buildFront (task) {
  await task.source('src').shell('NODE_ENV=production webpack --silent')
}

// Do analyze front-end(with webpack-bundle-analyzer).
export async function analyze (task) {
  await task.source('src').shell('ANALYZE=true webpack --profile --json > stats.json')
}

// Show stats of analyze.
export async function showStats (task) {
  await task.source('src').shell('webpack-bundle-analyzer stats.json')
}

// Show stats
export async function stats (task) {
  await task.serial(['analyze', 'showStats'])
}

// Do build lib.
// FIXME: Replace here to @taskr/babel after babel v7 integration merged into master.
export async function babelLib (task) {
  await task.source('src').shell(`babel lib --out-dir distLib`)
}

// Do build server-side.
// FIXME: Replace here to @taskr/babel after babel v7 integration merged into master.
export async function babel (task) {
  await task.source('src').shell(`babel src --out-dir dist`)
}

// Do build back/front-end.
export async function build (task) {
  await task.serial(['clear', 'copy', 'babelLib', 'buildPages', 'babel', 'buildFront'])
}

export default async function (task) {
  await task.serial(['build'])
}
