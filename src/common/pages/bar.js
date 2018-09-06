import React from 'react'
import { Helmet } from 'react-helmet'
import wait from 'waait'

const bar = () => {
  return (
    <>
      <Helmet>
        <title>Bar | React SSR Example</title>
      </Helmet>

      <h1>bar</h1>
    </>
  )
}

bar.getInitialProps = async () => {
  console.log('Wait 1s before render...')
  // Simple wait example.
  await wait(1000)
}

export default bar
