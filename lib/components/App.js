import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import _ from 'lodash'

export default hot(module)(({ options, pages }) => {
  const { Page404 } = options

  return (
    <>
      <Helmet>
        <title>React SSR Example</title>
      </Helmet>

      <Switch>
        {_.map(pages, (Component, path) => (
          <Route exact key={path} path={path} component={Component} />
        ))}
        <Route path='*' component={Page404} />
      </Switch>
    </>
  )
})
