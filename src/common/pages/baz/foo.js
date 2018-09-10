import React from 'react'
import { Helmet } from 'react-helmet'

import asPage from 'common/hocs/asPage'

const Foo = () => {
  return (
    <>
      <Helmet>
        <title>Baz - Foo</title>
      </Helmet>

      <h1>Baz - Foo</h1>
    </>
  )
}

export default asPage(Foo)
