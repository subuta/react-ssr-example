import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { Pages, preload } from 'pages'

import Counter from 'components/Counter'

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
