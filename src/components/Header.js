import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import Counter from 'components/Counter'

import {
  getInitialPropsFromComponent
} from 'lib/utils/initialProps'

import { Pages } from 'pages'
import log from 'lib/utils/log'

export default () => {
  return (
    <div style={{ background: '#d6d6d6' }}>
      {_.map(Pages, (Loadable, path) => (
        <Link
          style={{ margin: '0 8px 0 0' }}
          to={path}
          onMouseEnter={async () => {
            log(`[start] Pre-fetching bundle for ${path}`)
            // fetch Page component(bundle).
            const Component = await Loadable.load()
            // fetch initialProps of Page.
            const initialProps = await getInitialPropsFromComponent(Component, path)
            log(`[end] Pre-fetching bundle for ${path} initialProps=`, initialProps)
          }}
          key={path}
        >{path}</Link>
      ))}

      <Counter />
    </div>
  )
}
