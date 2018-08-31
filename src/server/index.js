'use strict'; // load env

require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  require('esm');

  require('@babel/register');
}

require('./main');