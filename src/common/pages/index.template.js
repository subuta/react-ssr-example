import React from 'react'
import { Switch, Route } from 'react-router-dom'
import loadable from 'loadable-components' // eslint-disable-line
import _ from 'lodash'

import {
  getInitialProps
} from 'common/utils/initialProps'

import getPath from 'common/utils/getPath'

import log from 'common/utils/log'

import Page404 from './404'

const renderLoadable = ({ Component, loading, error, ownProps }) => { // eslint-disable-line
  if (loading) {
    // Show loader while loading
    return <div>Loading...</div>
  }

  if (error) return <div>Oops! {error.message}</div>

  // Access ctx from react-router's staticContext.
  const ctx = _.get(ownProps, 'staticContext.ctx', {})

  // get currentPath and initialProps.
  const currentPath = getPath(ctx)
  const initialProps = _.get(getInitialProps(ctx), currentPath, {})

  // Then render component with initialProps.
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
