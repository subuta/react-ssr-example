'use strict'

// load env
require('dotenv')

if (process.env.NODE_ENV !== 'production') {
  require('esm')
  require('@babel/register')
}

require('./main')