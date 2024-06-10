'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cmj.min.js');
} else {
  module.exports = require('./cmj.js');
}