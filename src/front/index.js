import '@babel/polyfill'

import { render } from 'lib'
import Pages from 'src/pages'

// SEE: http://bluebirdjs.com/docs/api/promise.config.html
// Add settings for bluebird.
Promise.config({
  // Enable warnings
  warnings: false,
  // Enable long stack traces
  longStackTraces: false,
  // Enable cancellation
  cancellation: true,
  // Enable monitoring
  monitoring: false
})

const main = async () => {
  render(Pages)
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
