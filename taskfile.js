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

// Do build server-side.
export async function buildServer (task) {
  await task.source(src.server)
    .babel()
    .target(dist.d)
}

export default async function (task) {
  await task.serial(['clear', 'copy', 'buildServer'])
}