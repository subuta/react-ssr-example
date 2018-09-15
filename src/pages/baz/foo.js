import React from 'react'
import { Helmet } from 'react-helmet'

import Header from 'components/Header'

const Foo = () => {
  return (
    <>
      <Helmet>
        <title>Baz - Foo</title>
      </Helmet>

      <Header />

      <h1>Baz - Foo</h1>
    </>
  )
}

export default Foo
