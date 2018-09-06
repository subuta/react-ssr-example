import React from 'react'
import loadable from 'loadable-components'
import _ from 'lodash'
import getPath from 'common/utils/getPath'

import NotFound from 'common/pages/404'

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
    console.error('[404]', err)
    return NotFound
  }

  console.error('Unknown error', err)
  // Render null component otherwise.
  return () => null
}

export default (ctx) => {
  const path = getPath(ctx)
  return loadable(
    () => import(`../pages${path}.js`).catch(onImportError),
    { ErrorComponent, LoadingComponent }
  )
}