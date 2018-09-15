import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadComponents } from 'loadable-components'

import unwrapModule from 'lib/utils/unwrapModule'

export default async (selector = '#app', options = {}) => {
  let { App } = options

  // Defaults to pre-defined App.
  if (!App) {
    App = unwrapModule(require('lib/components/App'))
  }

  const app = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

  await loadComponents()

  ReactDOM.hydrate(app, document.querySelector(selector))
}
