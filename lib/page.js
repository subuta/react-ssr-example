import React from 'react'

import { getInitialPropsFromComponent } from 'lib/utils/initialProps'
import log from 'lib/utils/log'

// Pre-fetch loadable component with pre-resolving initialProps.
export const preload = async (loadable, path) => {
  log(`[start] Pre-fetching bundle for ${path}`)
  // fetch Page component(bundle).
  const Component = await loadable.load()
  // fetch initialProps of Page.
  const initialProps = await getInitialPropsFromComponent(Component, path)
  log(`[end] Pre-fetching bundle for ${path} initialProps=`, initialProps)
  return initialProps
}

/* eslint-disable */
import loadable from 'loadable-components'
import {
  wrap,
  render
} from 'lib/utils/loadable'

// Pages will be injected to here for better hmr support.
export const Pages = []
/* eslint-enable */

export default Pages
