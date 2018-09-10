import React from 'react'
import { Helmet } from 'react-helmet'

import asPage from 'common/hocs/asPage'

const Hoge = () => {
  return (
    <>
      <Helmet>
        <title>Bar - Hoge</title>
      </Helmet>

      <h1>Bar - Hoge</h1>
    </>
  )
}

export default asPage(Hoge)
