import React from 'react'
import { Helmet } from 'react-helmet'

import asPage from 'lib/hocs/asPage'
import Counter from 'components/Counter'
import Header from 'components/Header'

const Foo = () => {
  return (
    <>
      <Helmet>
        <title>Foo | React SSR Example</title>
      </Helmet>

      <Header />

      <h1>Foo</h1>

      <Counter />
    </>
  )
}

export default asPage(Foo)
