import React from 'react'
import _ from 'lodash'

import pMinDelay from 'p-min-delay'

import {
  getInitialProps,
  getInitialPropsFromContext
} from 'lib/utils/initialProps'
import { isBrowser } from 'lib/utils/env'
import asPage from 'lib/hocs/asPage'

import unwrapModule from 'lib/utils/unwrapModule'

// Wait at least 200ms before show component.
const delay = promise => { // eslint-disable-line
  if (!isBrowser) return promise
  // Pass-through for initial render.
  if (getInitialProps()) return promise
  // Minimum delay for loading.
  return pMinDelay(promise, 200)
}

// Render loadable component with Loading/Error state.
export const renderLoadable = ({ Component, loading, error, ownProps }) => { // eslint-disable-line
  if (loading) return <div>Loading...</div>
  if (error) return <div>Oops! {error.message}</div>

  // Get react-router's staticContext.
  const context = _.get(ownProps, 'staticContext', {})
  let initialProps = getInitialPropsFromContext(context)

  return <Component {...initialProps} {...ownProps} />
}

// Create react-loadable component with HOC.
const createLoadable = (module) => async () => { // eslint-disable-line
  const Component = unwrapModule(await delay(module))
  return asPage(Component)
}

export default createLoadable
