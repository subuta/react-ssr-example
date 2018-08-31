import React from 'react'
import { hot } from 'react-hot-loader'

import Counter from 'common/components/Counter'

import {
  compose
} from 'recompose'

const enhance = compose(
  hot(module)
)

export default enhance(() => {
  return (
    <div>
      <Counter></Counter>
    </div>
  )
})
