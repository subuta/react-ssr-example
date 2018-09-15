import React from 'react'
import _ from 'lodash'

import {
  getInitialPropsFromContext
} from 'lib/utils/initialProps'
import asPage from 'lib/hocs/asPage'

import unwrapModule from 'lib/utils/unwrapModule'

export const renderLoadable = ({ Component, loading, error, ownProps }) => {
  if (loading) return <div>Loading...</div>
  if (error) return <div>Oops! {error.message}</div>

  // Get react-router's staticContext.
  const context = _.get(ownProps, 'staticContext', {})
  let initialProps = getInitialPropsFromContext(context)

  return <Component {...initialProps} {...ownProps} />
}

export const createLoadable = (module) => {
  return asPage(unwrapModule(module))
}

export default createLoadable
