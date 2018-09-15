import React from 'react'

import _ from 'lodash'
import { isBrowser } from './env'
import getPath from './getPath'

const KEY = '__INITIAL_PROPS__'

// Pool of promise. key by path.
let promises = {}

export const getInitialPropsFromComponent = async (Component, path) => {
  // Set promise for currentPath if not found.
  if (!getPromise(path)) {
    // Use getInitialProps if exists.
    const fn = Component.getInitialProps || (() => Promise.resolve())
    // Remember promise for later use.
    rememberPromise(fn(), path)
  }

  const promise = getPromise(path)

  // Await for resolving initialProps promise.
  const result = await promise

  return result || {}
}

// Keep promise reference.
export const rememberPromise = (promise, path) => {
  _.set(promises, [path], promise)
}

// Forget promise reference.
export const forgetPromise = (path) => {
  // Clear whole promise if path not specified.
  if (!path) {
    promises = {}
    return
  }
  _.set(promises, [path], null)
}

// Keep promise reference.
export const getPromise = (path) => {
  return _.get(promises, [path], null)
}

// Keep initialProps reference to ctx.
export const rememberInitialProps = (initialProps, ctx = {}) => {
  // Set initialProps to window if browser
  const path = getPath(ctx)
  _.set(ctx, ['res', 'locals', path], initialProps)
}

// // Keep initialProps reference to ctx.
// export const mergeInitialProps = (initialProps, ctx = {}, path = '') => {
//   // Set initialProps to window if browser
//   if (isBrowser) return _.set(window, [KEY, path], initialProps)
//   _.set(ctx, ['res', 'locals', path], { initialProps })
// }

export const forgetInitialProps = () => {
  if (!isBrowser) return
  // Clear initialProps from window if browser
  _.set(window, [KEY], null)
}

// Get current path initialProps from ctx.
export const getInitialProps = (ctx = {}) => {
  const path = getPath(ctx)
  // Get initialProps from window if browser
  if (isBrowser) return _.get(window, [KEY, path], null)
  // Get initialProps from ctx otherwise.
  return _.get(ctx, ['res', 'locals', path], null)
}

// Get all initialProps for embed.
export const getAllInitialProps = (ctx = {}) => {
  // Get initialProps from window if browser
  if (isBrowser) return _.get(window, [KEY], null)
  // Get initialProps from ctx otherwise.
  return _.get(ctx, ['res', 'locals'], null)
}

// Get initialProps from context(react-router's StaticContext).
export const getInitialPropsFromContext = (context) => {
  // Access ctx from react-router's staticContext.
  const ctx = _.get(context, 'ctx', {})

  // get initialProps ctx/window (if SSR)
  return getInitialProps(ctx)
}

const getScriptContent = (ctx) => {
  // Retrieve initialProps for page.
  const initialProps = getAllInitialProps(ctx)
  return `window.${KEY} = ${JSON.stringify(initialProps)};`
}

export const getScriptTag = (ctx) => {
  return `<script>${getScriptContent(ctx)}</script>`
}

export const getScriptElement = (ctx) => {
  return (
    <script dangerouslySetInnerHTML={{ __html: getScriptContent(ctx) }} />
  )
}
