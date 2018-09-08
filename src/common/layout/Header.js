import React from 'react'
import { Link } from 'react-router-dom'

import Counter from 'common/components/Counter'

export default () => {
  return (
    <div style={{ background: '#d6d6d6' }}>
      <Link style={{ margin: '0 8px 0 0' }} to='/foo'>/foo</Link>
      <Link style={{ margin: '0 8px 0 0' }} to='/bar'>/bar</Link>
      <Link style={{ margin: '0 8px 0 0' }} to='/baz'>/baz</Link>

      <Counter />
    </div>
  )
}
