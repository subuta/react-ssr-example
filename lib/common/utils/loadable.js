import React from 'react'
import _ from 'lodash'

import {
  getInitialPropsFromContext,
  getInitialPropsFromComponent
} from './initialProps'
import asPage from 'lib/common/hocs/asPage'

import unwrapModule from './unwrapModule'
import log from './log'

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
