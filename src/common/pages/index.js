import React from 'react'
import { Switch, Route } from 'react-router-dom'
import loadable from 'loadable-components'
import _ from 'lodash'

import {
  getPages
} from 'common/utils/fetchPages'

import {
  getInitialProps
} from 'common/utils/initialProps'

import getPath from 'common/utils/getPath'

import log from 'common/utils/log'

import Page404 from './404'

const LoadingComponent = () => {
  return (
    <div>Loading...</div>
  )
}

const ErrorComponent = (props) => {
  console.log('props.error = ', props.error)
  return <div>Error!</div>
}

const onImportError = (err) => {
  if (err.message.match(/Cannot find module '.*\.js'/)) {
    log('[404]', err)
    return Page404
  }

  console.error('Unknown error', err)
  // Render null component otherwise.
  return () => null
}

export const Pages = _.transform(getPages(), (result, page) => {
  result[page] = loadable(
    async () => await import(`.${page}`).catch(onImportError),
    {
      ErrorComponent,
      LoadingComponent
    }
  )
}, {})

export default ({ ctx }) => {
  const currentPath = getPath(ctx)

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
                   component={(props) => <Component {...props} {...initialProps} />}
            />
          )
        }
        return (
          <Route
            exact
            key={path}
            path={path}
            component={(props) => <Component {...props} />}
          />
        )
      })}
      <Route path='*' component={Page404} />
    </Switch>
  )
}