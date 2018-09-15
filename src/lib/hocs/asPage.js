import {
  compose,
  withState,
  branch,
  lifecycle,
  renderComponent,
  mapProps,
  hoistStatics
} from 'recompose'
import _ from 'lodash'

import {
  getInitialPropsFromComponent,
  getInitialPropsFromContext,
  forgetInitialProps,
  forgetPromise
} from 'lib/utils/initialProps'
import { isBrowser } from 'lib/utils/env'
import getPath from 'lib/utils/getPath'

const mapCtx = mapProps((props) => {
  // Get ctx from react-router's staticContext.
  const ctx = _.get(props, 'staticContext.ctx', {})
  // Merge ctx into props.
  return {
    ...props,
    ctx
  }
})

// FIXME: Might be replaced with Suspense API? :)
// SEE: https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html
// TIPS: hoisting getInitialProps by calling `hoistStatics` and pass enhancer.
export default (Component) => hoistStatics(compose(
  // Get props from react-router's staticContext.
  withState('initialProps', 'setInitialProps', (props) => {
    // Get react-router's staticContext.
    const context = _.get(props, 'staticContext', {})
    return getInitialPropsFromContext(context)
  }),
  mapCtx,
  lifecycle({
    componentDidMount: async function () {
      let { initialProps, ctx } = this.props

      // Forget initialProps for prompt client-side resolving of getInitialProps.
      if (isBrowser) {
        forgetInitialProps()
      }

      this.path = getPath(ctx)

      this.promise = Promise.resolve(initialProps)
      if (initialProps === null) {
        // Call getInitialProps otherwise(while client-side routing)
        this.promise = getInitialPropsFromComponent(Component, ctx)
      }

      initialProps = await this.promise
      this.props.setInitialProps(initialProps)
    },

    componentWillUnmount () {
      if (this.promise.cancel) {
        this.promise.cancel()
      }
      forgetPromise(this.path)
    }
  }),
  // Delay component render while resolving.
  branch(
    ({ initialProps }) => {
      // Skip delay while SSR.
      return isBrowser && initialProps === null
    },
    renderComponent(() => null),
    _.identity
  ),
  mapProps(({ initialProps, ...rest }) => {
    // Merge initialProps into props.
    return {
      ...rest,
      ...initialProps
    }
  })
))(Component)
