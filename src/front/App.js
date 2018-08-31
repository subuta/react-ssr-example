import React from 'react'
import { hot } from 'react-hot-loader'
import Loadable from 'react-loadable';
import waait from 'waait'
import _ from 'lodash'

import {
  compose
} from 'recompose'

const Loading = (props) => {
  if (props.error) {
    console.log('props.error = ', props.error)
    // FIXME: https://github.com/jamiebuilds/react-loadable/pull/123
    // return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
    return null;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>;
  } else {
    return null;
  }
}

const LoadableCounter = Loadable({
  loader: async () => {
    await waait(1000)
    return import('common/components/Counter')
  },
  loading: Loading
});


const enhance = compose(
  hot(module)
)

export default enhance(({state = 'started!'}) => {
  return (
    <div>
      <b>{state}</b>
      <LoadableCounter></LoadableCounter>
    </div>
  )
})
