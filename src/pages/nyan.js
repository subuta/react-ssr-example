import React from 'react'
import { Helmet } from 'react-helmet'

import Header from 'components/Header'
import asPage from 'lib/hocs/asPage'

const Nyan = () => {
  return (
    <>
      <Helmet>
        <title>Nyan</title>
      </Helmet>

      <Header />

      <h1>Nyan</h1>
    </>
  )
}

export default asPage(Nyan)
