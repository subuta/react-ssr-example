import React from 'react'
import { Helmet } from 'react-helmet'
import wait from 'waait'

import Header from 'components/Header'

const Bar = () => {
  return (
    <>
      <Helmet>
        <title>Bar | React SSR Example</title>
      </Helmet>

      <Header />

      <h1>Bar</h1>

      <span>1 seconds elapsed since getInitialProps().</span>
    </>
  )
}

Bar.getInitialProps = async () => {
  console.log('Wait 1s before render...')
  // Simple wait example.
  await wait(1000)
}

export default Bar
