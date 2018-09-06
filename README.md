# React SSR Example
Server-Side rendered react example :)

### Feature

- HMR(+ Server-Side routes hot reloading) Included :heart:
  - with [koa](https://github.com/koajs/koa)
  - based on [ultimate-hot-reloading-example](https://github.com/glenjamin/ultimate-hot-reloading-example)
- Do SEO (google) and SMO (twitter, facebook...) for React app.
  - with [react-helmet](https://github.com/nfl/react-helmet)
- Event Handlers are works as expected (SSR + Hydrate)
  - with [loadable-components](https://github.com/smooth-code/loadable-components)
- No complex routing logic needed anymore! (Will just render page in the `/pages`)
- [next.js](https://github.com/zeit/next.js/) inspired `getInitialProps` lifecycle.

### How to develop

```
# Install dependencies
npm i

# Start development server with HMR and file watcher
npm run serve
```

### Run production

```
# Compile sources
npm run build

# Start production server(only hosting static file)
npm run servep
```

### FAQ

> How to show bundle size?

Run `npm run stats` will show stats report via [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

> Which browser supported(polyfilled)?

Run `npm run browsers` will list supported(will be polyfilled) browsers.

> How to run lint?

Run `npm run lint` will do that based on [JavaScript Standard Style](https://standardjs.com/)

and Run `npm run fix` will fix lint issues automatically :)

> TypeError: Cannot read property 'hash' of undefined

SEE: https://github.com/mzgoddard/hard-source-webpack-plugin/issues/416
Run `rm -rf ./node_modules/.cache/hard-source`