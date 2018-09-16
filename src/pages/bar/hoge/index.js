import React from 'react'
import { Helmet } from 'react-helmet'

import Header from 'src/components/Header'

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

export default Hoge
