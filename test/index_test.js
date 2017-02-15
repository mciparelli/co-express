var test = require('./main_test.js')
var cos = [
  // {
  //   name: 'bluebird',
  //   co: require('bluebird').coroutine
  // },
  // {
  //   name: 'q',
  //   co: require('q').async
  // },
  {
    name: 'co',
    co: require('co').wrap
  },
  {
    // make sure default works
    name: 'unspecfied (defaults to co)'
  }
]

cos.forEach(test)
