import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import Pages from 'src/pages'
import { preload } from 'lib/utils/loadable'

import Counter from 'src/components/Counter'

export default () => {
  return (
    <div style={{ background: '#d6d6d6' }}>
      {_.map(Pages, (Loadable, path) => (
        <Link
          style={{ margin: '0 8px 0 0' }}
          to={path}
          onMouseEnter={() => preload(Loadable, path)}
          key={path}
        >{path}</Link>
      ))}

      <Counter />
    </div>
  )
}
