import debug from 'debug'
import isBrowser from './isBrowser'

export const log = (() => {
  // SEE: https://github.com/visionmedia/debug#output-streams
  let logger = debug(isBrowser ? 'app:browser' : 'app:server')
  logger.log = console.log.bind(console)
  return logger
})()

export default log
