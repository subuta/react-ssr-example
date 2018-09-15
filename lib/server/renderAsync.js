import React from 'react'

import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router-dom'

import {
  renderToString,
  renderToStaticMarkup
} from 'react-dom/server'
import { getLoadableState } from 'loadable-components/server'

import {
  getInitialPropsFromComponent,
  rememberInitialProps,
  forgetPromise,
  getScriptElement as getInitialPropsScriptElement
} from 'lib/utils/initialProps'

import unwrapModule from 'lib/utils/unwrapModule'
import getPath from 'lib/utils/getPath'

import { Pages } from 'pages'

import _ from 'lodash'

export default async (url, options = {}) => {
  let { App, Document } = options

  // Defaults to pre-defined App.
  if (!App) {
    App = unwrapModule(require('lib/components/App'))
  }

  // Defaults to pre-defined Document.
  if (!Document) {
    Document = unwrapModule(require('lib/components/Document'))
  }

  // Common context that will shared between modules while rendering.
  const ctx = {
    url
  }

  const app = (
    <StaticRouter context={{ ctx }} location={getPath(ctx)}>
      <App />
    </StaticRouter>
  )

  // Wait for loadable-components.
  const loadableState = await getLoadableState(app)

  const Page = _.get(Pages, getPath(ctx), null)
  if (Page) {
    // Call getInitialProps of Page if defined.
    // Fetch initialProps and remember it in ctx.
    const initialProps = await getInitialPropsFromComponent(Page, getPath(ctx))
    rememberInitialProps(initialProps, ctx)
  }

  const html = renderToString(app)

  // Clear remembered promise while render.
  forgetPromise()

  const helmet = Helmet.renderStatic()

  const scripts = (
    <>
      {helmet.title.toComponent()}
      {helmet.base.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.link.toComponent()}
      {helmet.style.toComponent()}
      {helmet.script.toComponent()}
    </>
  )

  const loadableStateScript = loadableState.getScriptElement()
  const initialPropsScript = getInitialPropsScriptElement(ctx)

  const bodyScripts = (
    <>
      {loadableStateScript}
      {initialPropsScript}
    </>
  )

  let responseHTML = renderToStaticMarkup(
    <Document
      htmlAttributes={helmet.htmlAttributes.toComponent()}
      bodyAttributes={helmet.htmlAttributes.toComponent()}
      scripts={scripts}
      bodyScripts={bodyScripts}
      main={<div id='app' dangerouslySetInnerHTML={{ __html: html }} />}
    />
  )

  return '<!doctype html>\n' + responseHTML
}
