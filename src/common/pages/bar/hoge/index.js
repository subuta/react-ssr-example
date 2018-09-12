import React from 'react'
import { Helmet } from 'react-helmet'

import asPage from 'common/hocs/asPage'
import Header from 'common/layout/Header'

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
