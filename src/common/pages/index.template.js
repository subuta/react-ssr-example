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

const LoadingComponent = () => { // eslint-disable-line
  return (
    <div>Loading...</div>
  )
}

const ErrorComponent = (props) => { // eslint-disable-line
  console.log('props.error = ', props.error)
  return <div>Error!</div>
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

// Pages will be injected for better hmr support.
/* eslint-disable */
export const Pages = []
/* eslint-enable */

export default ({ ctx }) => {
  const currentPath = getPath(ctx)

  /* eslint-disable */
  return (
    <Switch>
      {_.map(Pages, (Component, path) => {
        // if currentPath
        if (path === currentPath) {
          // Then render with initialProps.
          const initialProps = getInitialProps(ctx) || {}
          return (
            <Route exact
              key={path}
              path={path}
              component={Component}
            />
          )
        }
        return (
          <Route
            exact
            key={path}
            path={path}
            component={Component}
          />
        )
      })}
      <Route path='*' component={Page404} />
    </Switch>
  )
  /* eslint-enable */
}