import React from 'react'
import { Helmet } from 'react-helmet'

import asPage from 'lib/hocs/asPage'
import Header from 'components/Header'

const Hoge = () => {
  return (
    <>
      <Helmet>
        <title>Bar - Hoge</title>
      </Helmet>

      <Header />

      <h1>Bar - Hoge</h1>
    </>
  )
}

export default asPage(Hoge)
