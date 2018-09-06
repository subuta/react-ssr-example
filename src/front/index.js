import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from 'common/layout/App'
import { loadComponents } from 'loadable-components'
import getPath from 'common/utils/getPath'

const render = () => {
  ReactDOM.hydrate(<App path={getPath()} />, document.getElementById('app'))
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
