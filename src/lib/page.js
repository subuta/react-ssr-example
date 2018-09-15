import React from 'react'
import { Switch, Route } from 'react-router-dom'
import _ from 'lodash'

import Page404 from 'lib/components/404'

/* eslint-disable */
import loadable from 'loadable-components'
import createLoadable, {
  renderLoadable
} from 'lib/utils/createLoadable'

// Pages will be injected to here for better hmr support.
export const Pages = []
/* eslint-enable */

export default ({ ctx }) => {
  return (
    <Switch>
      {_.map(Pages, (Component, path) => (
        <Route exact key={path} path={path} component={Component} />
      ))}
      <Route path='*' component={Page404} />
    </Switch>
  )
}
