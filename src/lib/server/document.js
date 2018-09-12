import React from 'react'

export default (props) => {
  const {
    main,
    htmlAttributes,
    scripts,
    bodyAttributes,
    bodyScripts
  } = props

  return (
    <html {...htmlAttributes}>
      <head>
        <title>Hoge</title>

        {scripts}
      </head>
      <body {...bodyAttributes}>
        <div className='container'>
          <h3>React SSR Example</h3>
          {main}
        </div>

        {bodyScripts}
        <script src='/main.bundle.js' />
      </body>
    </html>
  )
}
