import React from 'react'
import Loadable from 'react-loadable'
import _ from 'lodash'

import NotFound from '../pages/404'

const Loading = (props) => {
  if (props.error) {
    const errorMessage = _.get(props.error, 'message', '')
    if (errorMessage.match(/Cannot find module '.*\.js'/)) {
      console.error(`[404]`, errorMessage)
      return <NotFound />
    }

    console.log('props.error = ', props.error)
    // Uses React v16.3.X currently to avoid this error of react-loadable...
    // SEE: https://github.com/jamiebuilds/react-loadable/pull/123
    // return <div>Error! <button onClick={props.retry}>Retry</button></div>
    return null
  } else if (props.pastDelay) {
    return <div>Loading...</div>
  } else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={props.retry}>Retry</button></div>
  } else {
    return null
  }
}

export default ({ path }) => {
  // Load Page from common/pages
  const Component = Loadable({
    // loader: async () => import(`common/pages${path}.js`),
    loader: async () => import(`../pages${path}.js`),
    loading: Loading
  })
  return <Component />
}