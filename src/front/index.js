import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../common/layout/App'
import Loadable from 'react-loadable'
import getPath from '../common/utils/getPath'

const render = () => {
  ReactDOM.hydrate(<App path={getPath()} />, document.getElementById('app'))
}

Loadable.preloadReady().then(() => render())

const main = async () => {
  render()
}

// Native
// Check if the DOMContentLoaded has already been completed
if (document.readyState !== 'loading') {
} else {
  document.addEventListener('DOMContentLoaded', main)
}

if (module.hot) {
  console.clear()
  module.hot.accept()
}
