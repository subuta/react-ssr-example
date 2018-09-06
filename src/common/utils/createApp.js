import React from 'react'

import App from 'common/layout/App'
import createPages from './createPages'

export default (ctx) => {
  const Pages = createPages(ctx)

  return (
    <App>
      <Pages />
    </App>
  )
}