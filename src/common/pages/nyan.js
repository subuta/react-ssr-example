import React from 'react'
import { Helmet } from 'react-helmet'

import asPage from 'common/hocs/asPage'

const Nyan = () => {
  return (
    <>
      <Helmet>
        <title>Nyan</title>
      </Helmet>

      <h1>Nyan</h1>
    </>
  )
}

export default asPage(Nyan)
