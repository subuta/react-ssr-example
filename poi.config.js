const _ = require('lodash')
const path = require('path')

const rootPath = path.resolve(process.cwd())

// setting for building docs
module.exports = (options, req) => ({
  entry: './src/front/index.js',
  dist: 'public',

  // Babel settings for poi.
  presets: [
    "poi"
  ],

  transformModules: [],

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },

  webpack (config) {
    config = _.assign(config, {
      // devtool: 'cheap-module-source-map',
      node: {
        module: 'empty',
        fs: 'empty'
      },

      resolve: {
        // add resolve.root to project root.
        modules: [
          ..._.get(config, 'resolve.modules', []),
          rootPath
        ]
      }
    })

    return config
  }
})