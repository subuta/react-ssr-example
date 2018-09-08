import React from 'react'
import { Helmet } from 'react-helmet'
import loadable from 'loadable-components'

import Counter from 'common/components/Counter'
import ClassCounter from 'common/components/ClassCounter'

const AsyncCounter = loadable(() => import('../components/ClassCounter'))

const foo = () => {
  return (
    <>
      <Helmet>
        <title>Foo | React SSR Example</title>
      </Helmet>

      <h1>fuo</h1>

      <hr />

      <Counter />
      <ClassCounter />

      <hr />

      <AsyncCounter />
    </>
  )
}

export default foo
