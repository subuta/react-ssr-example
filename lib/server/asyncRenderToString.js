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
} from 'lib/common/utils/initialProps'

import getPath from 'lib/common/utils/getPath'
import DefaultApp from 'lib/common/components/App'
import DefaultDocument from 'lib/common/components/Document'
import Default404 from 'lib/common/components/404'

import _ from 'lodash'

export default async (Pages, url, options = {}) => {
  let { App, Document } = options

  // Defaults to pre-defined App.
  if (!App) {
    App = DefaultApp
  }

  // Defaults to pre-defined Document.
  if (!Document) {
    Document = DefaultDocument
  }

  // Set 404 page component if not defined.
  if (!options.Page404) {
    options.Page404 = Default404
  }

  // Common context that will shared between modules while rendering.
  const ctx = {
    url
  }

  const app = (
    <StaticRouter context={{ ctx }} location={getPath(ctx)}>
      <App options={options} pages={Pages} />
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

  // Script tag for loadable-components.
  const loadableStateScript = loadableState.getScriptElement()
  // Script tag for initialProps.
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
