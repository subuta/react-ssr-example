import React from 'react'
import { Switch, Route } from 'react-router-dom'
import loadable from 'loadable-components' // eslint-disable-line
import _ from 'lodash'

import pMinDelay from 'p-min-delay'

import log from 'lib/utils/log'
import {
  getInitialProps,
  getInitialPropsFromContext
} from 'lib/utils/initialProps'
import { isBrowser } from 'lib/utils/env'
import asPage from 'lib/hocs/asPage'

import Page404 from 'lib/components/404'
import unwrapModule from 'lib/utils/unwrapModule'

const delay = promise => { // eslint-disable-line
  if (!isBrowser) return promise
  // Pass-through for initial render.
  if (getInitialProps()) return promise
  // Minimum delay for loading.
  return pMinDelay(promise, 200)
}

const renderLoadable = ({ Component, loading, error, ownProps }) => { // eslint-disable-line
  if (loading) return <div>Loading...</div>
  if (error) return <div>Oops! {error.message}</div>

  // Get react-router's staticContext.
  const context = _.get(ownProps, 'staticContext', {})
  let initialProps = getInitialPropsFromContext(context)

  return <Component {...initialProps} {...ownProps} />
}

const onImportError = (err) => { // eslint-disable-line
  if (err.message.match(/Cannot find module '.*\.js'/)) {
    log('[404]', err)
    return Page404
  }

  console.error('Unknown error', err)
  // Render null component otherwise.
  return () => null
}

const createLoadable = (module) => async () => { // eslint-disable-line
  const Component = unwrapModule(await delay(module).catch(onImportError))
  return asPage(Component)
}

// Pages will be injected to here for better hmr support.
/* eslint-disable */
export const Pages = []
/* eslint-enable */

export default ({ ctx }) => {
  return (
    <Switch>
      {_.map(Pages, (Component, path) => (
        <Route exact key={path} path={path} component={Component} />
      ))}
      <Route path='*' component={Page404} />
    </Switch>
  )
}
