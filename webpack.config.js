// Require the webpack-chain module. This module exports a single
// constructor function for creating a configuration API.
const Config = require('webpack-chain')

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const {
  ROOT_DIR,
  FRONT_DIR,
  SRC_DIR,
  LIB_DIR,
  PUBLIC_DIR
} = require('./config.js')

// Instantiate the configuration with a new API
const config = new Config()

// Detect is dev
const isAnalyze = !!process.env.ANALYZE
const dev = process.env.NODE_ENV !== 'production' && !isAnalyze

// Interact with entry points
config
  .entry('main')
  .add(path.resolve(FRONT_DIR, './index.js'))
  .end()
  .context(SRC_DIR)
  .stats(false)
  .target('web')
  .mode(dev ? 'development' : 'production')
  .devtool(dev ? 'cheap-module-source-map' : false)
  // Modify output settings
  .output
  .path(PUBLIC_DIR)
  .publicPath('/')
  .filename('[name].bundle.js')

// Add modules dir
config.resolve.modules
  .add('node_modules')
  .add(SRC_DIR)

// Add modules dir
config.resolve.alias
  .set('lib', LIB_DIR)

// Load and use `.babelrc.web`
const babelrc = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, '.babelrc.web')))

// Add babel-loader for JS.
config.module
  .rule('babel')
  .test(/\.jsx?$/)
  .exclude
  .add(/node_modules/)
  .end()
  .use('babel')
  .loader('babel-loader')
  .options({
    babelrc: false,
    ...babelrc
  })

config.devServer
  .hot(true)
  .noInfo(true)
  .contentBase(PUBLIC_DIR)
  .proxy({
    '/': 'http://localhost:3000'
  })

// SEE: https://github.com/mzgoddard/hard-source-webpack-plugin/issues/416
// Enable better caching for webpack compilation.
config
  .plugin('hard-source')
  .use(HardSourceWebpackPlugin)

config
  .plugin('error-overlay')
  .use(ErrorOverlayPlugin)

// Show progress-bar while compile.
config
  .plugin('progress')
  .use(WebpackBar, [{
    name: 'client',
    // Is show profile(Time taken while compile at each loader)
    profile: true
  }])

// Clean directory before compile.
config
  .plugin('clean')
  .use(CleanWebpackPlugin, [['public/**/*.js'], {
    exclude: ['index.html'],
    beforeEmit: true
  }])

// Set webpack optimization option.
config.optimization
  .noEmitOnErrors(true)

// Mock nodejs-only modules
config.node
  .set('fs', 'empty')
  .set('path', 'empty')

// Dev-only setting
config
  .when(dev, devConfig => {
    devConfig
      .plugin('friendly-errors')
      .use(FriendlyErrorsWebpackPlugin, [{
        clearConsole: false
      }])

    devConfig
      .plugin('hot-module-replacement')
      .use(webpack.HotModuleReplacementPlugin)
  })

// Analyze-only setting
config
  .when(isAnalyze, analyzeConfig => {
    analyzeConfig
      .plugin('named-modules')
      .use(BundleAnalyzerPlugin)

    // Disable some plugins for analyze correctly.
    analyzeConfig.plugins.delete('hard-source')
    analyzeConfig.plugins.delete('progress')
  })

// For debug print.
// console.log(config.toString())

// Export the completed configuration object to be consumed by webpack
module.exports = config.toConfig()
