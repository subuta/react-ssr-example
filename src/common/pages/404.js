import React from 'react'
import { Helmet } from 'react-helmet'

import Header from 'common/layout/Header'

export default () => {
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>

      <Header />

      <h1>404 Not found ;)</h1>
    </>
  )
}
