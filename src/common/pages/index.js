import React from 'react'
import { Switch, Route } from 'react-router-dom'
import loadable from 'loadable-components'
import {
  getPages
} from 'common/utils/fetchPages'
import _ from 'lodash'

import Page404 from './404'
import { getInitialProps, getInitialPropsFromComponent, rememberInitialProps } from '../utils/initialProps'
import isBrowser from '../utils/isBrowser'
import log from '../utils/log'

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
    return import(`.${page}`).catch(onImportError)
    // let Page = await import(`.${page}`).catch(onImportError)
    //
    // // Handle default export.
    // Page = Page.default ? Page.default : Page
    //
    // let initialProps = {}
    //
    // // Get initialProps from Component if SSR.
    // if (!isBrowser) {
    //   console.log('here!')
    //   initialProps = await getInitialPropsFromComponent(Page)
    //   console.log('initialProps = ', initialProps)
    // }
    //
    // return ({ ctx, ...rest }) => {
    //   console.log('render async!')
    //   console.log('ctx = ', ctx)
    //   if (ctx) {
    //     // Set initialProps reference to ctx.
    //     rememberInitialProps(ctx, initialProps)
    //
    //     // Get initialProps from ctx(or window.)
    //     initialProps = getInitialProps(ctx)
    //   }
    //
    //   return <Page {...initialProps} {...rest} />
    // }
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