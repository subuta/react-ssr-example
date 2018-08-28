import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server';
import TwitterCard from 'src/common/components/TwitterCard'

const render = async (Component) => {
  const getInitialProps = Component.getInitialProps || (() => Promise.resolve({}))

  // await for resolving initialProps promsie.
  const initialProps = await getInitialProps();

  return {
    initialProps,
    // Then render component to string with initialProps
    html: ReactDOMServer.renderToString(<Component {...initialProps} />)
  }
}

const main = async () => {
  const body = document.querySelector('body')

  const {
    html,
    initialProps
  } = await render(TwitterCard)

  body.innerHTML = `<div id="app">${html}</div>`

  const node = document.querySelector('#app')

  ReactDOM.hydrate(<TwitterCard {...initialProps} />, node)
}

main()