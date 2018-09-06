import React from 'react'

import App from 'common/layout/App'
import loadPage from './loadPage'

export default (ctx) => {
  const Page = loadPage(ctx)
  return (
    <App>
      <Page />
    </App>
  )
}