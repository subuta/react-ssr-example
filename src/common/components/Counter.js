import React from 'react'

import {
  compose,
  withState,
  withHandlers
} from 'recompose'

const enhance = compose(
  withState('counter', 'setCounter', 0),
  withHandlers({
    increment: ({ counter, setCounter }) => () => {
      setCounter(counter + 1)
    },

    decrement: ({ counter, setCounter }) => () => {
      setCounter(counter - 1)
    }
  })
)

export default enhance((props) => {
  const {
    counter,
    decrement,
    increment
  } = props

  return (
    <div style={{ margin: '8px 0' }}>
      <button onClick={decrement}>-</button>
      <b style={{ margin: '0 8px' }}>{counter}</b>
      <button onClick={increment}>+</button>
    </div>
  )
})
