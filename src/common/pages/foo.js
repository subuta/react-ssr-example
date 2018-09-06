import React from 'react'
import { Helmet } from 'react-helmet'

import Counter from 'common/components/Counter'

const foo = () => {
  return (
    <>
      <Helmet>
        <title>Foo | React SSR Example</title>
      </Helmet>

      <h1>foo</h1>
      <Counter />
    </>
  )
}

export default foo
