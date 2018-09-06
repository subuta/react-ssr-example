import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { loadComponents } from 'loadable-components'
import createApp from 'common/utils/createApp'

const app = createApp()

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
  console.clear()
  module.hot.accept()
}
