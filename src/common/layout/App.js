import React from 'react'
import { hot } from 'react-hot-loader'
import { Helmet } from 'react-helmet'

import {
  compose
} from 'recompose'

import Header from './Header'

const enhance = compose(
  hot(module)
)

export default enhance(({ children }) => {
  return (
    <>
      <Helmet>
        <title>React SSR Example</title>
        <meta charSet='utf-8' />
      </Helmet>

      <Header />
      {children}
    </>
  )
})
