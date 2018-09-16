import React from 'react'
import _ from 'lodash'

import {
  getInitialPropsFromContext,
  getInitialPropsFromComponent
} from 'lib/utils/initialProps'
import asPage from 'lib/hocs/asPage'

import unwrapModule from 'lib/utils/unwrapModule'
import log from 'lib/utils/log'

export const renderLoadable = ({ Component, loading, error, ownProps }) => {
  if (loading) return <div>Loading...</div>
  if (error) return <div>Oops! {error.message}</div>

  // Get react-router's staticContext.
  const context = _.get(ownProps, 'staticContext', {})
  let initialProps = getInitialPropsFromContext(context)

  return <Component {...initialProps} {...ownProps} />
}

export const wrapLoadable = (module) => {
  return asPage(unwrapModule(module))
}

// Pre-fetch loadable component with pre-resolving initialProps.
export const preload = async (loadable, path) => {
  log(`[start] Pre-fetching bundle for ${path}`)
  // fetch Page component(bundle).
  const Component = await loadable.load()
  // fetch initialProps of Page.
  const initialProps = await getInitialPropsFromComponent(Component, path)
  log(`[end] Pre-fetching bundle for ${path} initialProps=`, initialProps)
  return initialProps
}
