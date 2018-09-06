import React from 'react'
import { hot } from 'react-hot-loader'
import getPath from 'common/utils/getPath'

import Pages from './pages'

import {
  compose
} from 'recompose'

const enhance = compose(
  hot(module)
)

export default enhance(({ ctx }) => {
  return (
    <div>
      <Pages path={getPath(ctx)} />
    </div>
  )
})
