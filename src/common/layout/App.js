import React from 'react'
import { hot } from 'react-hot-loader'
import { Helmet } from 'react-helmet'
import { Route } from 'react-router-dom'
import loadable from 'loadable-components'

import {
  compose
} from 'recompose'

import Header from './Header'
import Page404 from 'common/pages/404'

const Foo = loadable(() => import('../pages/Foo'))
const Bar = loadable(() => import('../pages/Bar'))
const Baz = loadable(() => import('../pages/Baz'))

const enhance = compose(
  hot(module)
)

export default enhance(() => {
  return (
    <>
      <Helmet>
        <title>React SSR Example</title>
        <meta charSet='utf-8' />
      </Helmet>

      <Header />

      <main>
        <Route path='/foo' component={Foo} />
        <Route path='/bar' component={Bar} />
        <Route path='/baz' component={Baz} />
        <Route path='*' component={Page404} />
      </main>
    </>
  )
})
