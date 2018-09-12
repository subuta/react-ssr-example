import React from 'react'
import { Helmet } from 'react-helmet'

import asPage from 'common/hocs/asPage'
import Counter from 'common/components/Counter'
import Header from 'common/layout/Header'

const Foo = () => {
  return (
    <>
      <Helmet>
        <title>Foo | React SSR Example</title>
      </Helmet>

      <Header />

      <Counter />
    </>
  )
}

export default asPage(Foo)
