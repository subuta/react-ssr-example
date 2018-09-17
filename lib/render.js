import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadComponents } from 'loadable-components'

import unwrapModule from 'lib/utils/unwrapModule'

export default async (Pages, selector = '#app', options = {}) => {
  let { App } = options

  // Defaults to pre-defined App.
  if (!App) {
    App = unwrapModule(require('lib/components/App'))
  }

  // Set 404 page component if not defined.
  if (!options.Page404) {
    options.Page404 = unwrapModule(require('lib/components/404'))
  }

  const app = (
    <BrowserRouter>
      <App options={options} pages={Pages} />
    </BrowserRouter>
  )

  await loadComponents()

  ReactDOM.hydrate(app, document.querySelector(selector))
}
