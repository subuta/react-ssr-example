import React from 'react'
import loadable from 'loadable-components'

import NotFound from 'common/pages/404'

import getPath from 'common/utils/getPath'
import isBrowser from 'common/utils/isBrowser'
import log from 'common/utils/log'
import {
  getInitialPropsFromComponent,
  getInitialProps,
  rememberInitialProps
} from 'common/utils/initialProps'

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
    return NotFound
  }

  console.error('Unknown error', err)
  // Render null component otherwise.
  return () => null
}

export default (ctx = {}) => {
  const path = getPath(ctx)
  return loadable(
    async () => {
      let Page = await import(`../pages${path}.js`).catch(onImportError)

      // Handle default export.
      Page = Page.default ? Page.default : Page

      // Get initialProps from ctx(or window.)
      let initialProps = getInitialProps(ctx)

      // Get initialProps from Component if SSR.
      if (!isBrowser) {
        initialProps = await getInitialPropsFromComponent(Page)
      }

      // Set initialProps reference to ctx.
      rememberInitialProps(ctx, initialProps)

      return props => <Page {...initialProps} {...props} />
    },
    async () => import(`../pages${path}.js`).catch(onImportError),
    { ErrorComponent, LoadingComponent }
  )
}