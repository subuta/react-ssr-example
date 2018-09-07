import {
  PUBLIC_DIR,
  DIST_DIR
} from './config'

const src = {
  pages: 'pages/**/*',
  server: 'src/**/!(front)/*.js',
  copy: [
    'src/front/**/*.!(js)'
  ]
}

const dist = {
  p: PUBLIC_DIR,
  d: DIST_DIR
}

// Clear dist.
export async function clear (task) {
  await task.clear([dist.p, dist.d])
}

// Copy front-end files.
export async function copy (task) {
  await task.source(src.copy).target(dist.p)
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

// Do build server-side.
export async function babel (task) {
  await task.source(src.server)
    .babel({
      'extends': './.babelrc',
      'plugins': [
        ['babel-plugin-module-resolver', {
          'root': ['./dist']
        }]
      ]
    })
    .target(dist.d)
}

// Do build back/front-end.
export async function build (task) {
  await task.serial(['clear', 'copy', 'babel', 'buildFront'])
}

export default async function (task) {
  await task.serial(['build'])
}
