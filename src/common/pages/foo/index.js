import React from 'react'
import { Helmet } from 'react-helmet'

import asPage from 'common/hocs/asPage'
import Counter from 'common/components/Counter'

const Foo = () => {
  return (
    <>
      <Helmet>
        <title>Foo | React SSR Example</title>
      </Helmet>

      <h1>Foo</h1>
      <Counter />
    </>
  )
}

export default asPage(Foo)
