import React from 'react'
import Counter from 'common/components/Counter'

export default () => {
  return (
    <div style={{ background: '#d6d6d6' }}>
      <a style={{ margin: '0 8px 0 0' }} href='/foo'>/foo</a>
      <a style={{ margin: '0 8px 0 0' }} href='/bar'>/bar</a>
      <a style={{ margin: '0 8px 0 0' }} href='/baz'>/baz</a>

      <Counter />
    </div>
  )
}
