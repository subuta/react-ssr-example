import React from 'react'
import { Helmet } from 'react-helmet'

import Header from 'components/Header'

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

export default Nyan
