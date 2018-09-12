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
  forgetInitialProps
} from 'lib/utils/initialProps'
import { isBrowser } from 'lib/utils/env'

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
  lifecycle({
    componentDidMount () {
      const { initialProps, setInitialProps } = this.props

      // Forget initialProps for prompt client-side resolving of getInitialProps.
      if (isBrowser) {
        forgetInitialProps()
      }

      this.promise = Promise.resolve(initialProps)
      if (initialProps === null) {
        // Call getInitialProps otherwise(while client-side routing)
        this.promise = getInitialPropsFromComponent(Component)
      }

      this.promise.then((initialProps) => {
        setInitialProps(initialProps)
      })
    },

    componentWillUnmount () {
      if (this.promise.cancel) {
        this.promise.cancel()
      }
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
