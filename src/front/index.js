import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import waait from 'waait'
import ReactDOMServer from 'react-dom/server';
import App from './App'
import Loadable from 'react-loadable';

const hoge = 'hoge'

const obj = {
  hoge,
  fuga: 1
}

const obj2 = { ...obj }

const { fuga, ...rest } = obj2

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(<App />, document.getElementById('app'));
});

const render = (state) => {
  ReactDOM.hydrate(<App state={state} />, document.getElementById('app'))
}

const main = async () => {
  render('started!', true)

  await waait(1000)

  render('awaited')

  console.log('env = ', process.env.NODE_ENV)
  console.log(fuga)
  console.log(rest)

  render('ended')
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
