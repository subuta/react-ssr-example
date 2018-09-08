import '@babel/polyfill'

import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadComponents } from 'loadable-components'
import App from 'common/layout/App'

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

const render = () => {
  ReactDOM.hydrate(app, document.getElementById('app'))
}

const main = async () => {
  await loadComponents()
  render()
}

// Native
// Check if the DOMContentLoaded has already been completed
if (document.readyState !== 'loading') {
  main()
} else {
  document.addEventListener('DOMContentLoaded', main)
}

if (module.hot) {
  // console.clear()
  module.hot.accept()
}
