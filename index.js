var co = require('co');

module.exports = function wrap(gen) {
  var fn = co.wrap(gen);
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};
