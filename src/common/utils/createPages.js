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
  const errorMessage = _.get(props.error, 'message', '')
  if (errorMessage.match(/Cannot find module '.*\.js'/)) {
    console.error(`[404]`, errorMessage)
    return <NotFound />
  }

  console.log('props.error = ', props.error)
  return <div>Error!</div>
  // return <div>Error! <button onClick={props.retry}>Retry</button></div>
}

export default (ctx) => {
  const path = getPath(ctx)
  return loadable(
    () => import(`../pages${path}.js`),
    { ErrorComponent, LoadingComponent }
  )
}