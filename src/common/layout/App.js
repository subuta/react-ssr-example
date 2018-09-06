import React from 'react'
import { hot } from 'react-hot-loader'

import {
  compose
} from 'recompose'

const enhance = compose(
  hot(module)
)

export default enhance(({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
})
