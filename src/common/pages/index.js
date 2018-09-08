import React from 'react'
import { Switch, Route } from 'react-router-dom'
import loadable from 'loadable-components'
import _ from 'lodash'

import {
  getPages
} from 'common/utils/fetchPages'

import {
  getInitialProps,
  getInitialPropsFromComponent,
  rememberInitialProps
} from 'common/utils/initialProps'

import isBrowser from 'common/utils/isBrowser'
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

// Generate Routes for pages with code-splitting(via loadable-components).
const Routes = _.transform(getPages(), (result, page) => {
  result[page] = loadable(async () => {
    // return import(`.${page}`).catch(onImportError)
    let Page = await import(`.${page}`).catch(onImportError)

    // Handle default export.
    Page = Page.default ? Page.default : Page

    // Get initialProps from ctx(or window.)
    let initialProps = getInitialProps()

    // Get initialProps.
    // FIXME: getInitialProps call only occurred once after server started.
    if (!isBrowser) {
      initialProps = await getInitialPropsFromComponent(Page)
    }

    return ({ ctx, ...rest }) => {
      // Set initialProps reference to ctx.
      if (ctx) rememberInitialProps(initialProps, ctx)
      // Then render page with resolved initialProps.
      return <Page {...initialProps} {...rest} />
    }
  }, { ErrorComponent, LoadingComponent })
}, {})

export default ({ ctx }) => {
  return (
    <Switch>
      {_.map(Routes, (Component, path) => (
        <Route exact key={path} path={path} component={(props) => <Component {...props} ctx={ctx} />} />
      ))}
      <Route path='*' component={Page404} />
    </Switch>
  )
}