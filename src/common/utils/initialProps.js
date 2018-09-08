import _ from 'lodash'
import isBrowser from './isBrowser'

const KEY = '__INITIAL_PROPS__'

export const getInitialPropsFromComponent = async (Component) => {
  // Use getInitialProps if exists.
  const getInitialProps = Component.getInitialProps || (() => Promise.resolve({}))

  // Await for resolving initialProps promise.
  return getInitialProps() || {}
}

// Keep initialProps reference to ctx.
export const rememberInitialProps = (initialProps, ctx) => {
  // Set initialProps to window if browser
  if (isBrowser) return _.set(window, [KEY], initialProps)
  _.set(ctx, 'res.locals', { initialProps })
}

// Get initialProps from ctx.
export const getInitialProps = (ctx = {}) => {
  // Get initialProps from window if browser
  if (isBrowser) return _.get(window, [KEY], {})

  // Get initialProps from ctx otherwise.
  return _.get(ctx, 'res.locals.initialProps', {})
}

export const getScriptTag = (ctx) => {
  // Retrieve initialProps for page.
  const initialProps = getInitialProps(ctx)
  return `<script>window.${KEY} = ${JSON.stringify(initialProps)};</script>`
}
