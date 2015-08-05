var co = require('co');

module.exports = function wrap(gen) {
  var fn = co.wrap(gen);

  if (gen.length === 4) {
    return function(err, req, res, next) {
      return fn(err, req, res, next).catch(next);
    }
  }

  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};
