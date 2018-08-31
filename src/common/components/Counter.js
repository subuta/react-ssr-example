import React from 'react'
import { hot } from 'react-hot-loader'

import {
  compose,
  withState,
  withHandlers
} from 'recompose'

const enhance = compose(
  hot(module),
  withState('counter', 'setCounter', 0),
  withHandlers({
    onClick: ({counter, setCounter}) => (e) => setCounter(counter + 1)
  })
)

let Counter = enhance((props) => {
  const {
    counter,
    onClick,
  } = props

  return (
    <div>
      <h1 onClick={onClick}>{counter} times</h1>
    </div>
)
})

// Define next.js style getInitialProps for pre-render.
Counter.getInitialProps = async () => {
  // const uri = 'https://twitter.com/Interior/status/463440424141459456'
  // const data = await fetch(`http://localhost:8061/iframely?uri=${uri}`).then((res) => {
  //   return res.json()
  // })

  return {
  }
}

export default Counter