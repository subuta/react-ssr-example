import React from 'react'
import loadable from 'loadable-components'

const AsyncComponent = loadable(() => import('./_Component'))

export default () => {
  return (
    <AsyncComponent />
  )
}