var co = require('co');

module.exports = function wrap(gen) {
  var fn = co.wrap(gen);

  if (gen.length === 4) {
    return function(err, req, res, next) {
      var isParam = !(err instanceof Error);
      var callNextRoute = next;
      if (isParam) {
        callNextRoute = res;
      }
      return fn(err, req, res, next).catch(callNextRoute);
    }
  }

  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};
