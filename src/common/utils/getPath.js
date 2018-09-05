import _ from 'lodash'
import isBrowser from './isBrowser'

export default (ctx = {}) => {
  if (!isBrowser) return _.get(ctx, 'path', '')
  // Get path from location.
  return _.first(location.pathname.split('?'))
}