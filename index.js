var co = require('co');

var getErrorHandler = function(next) {
	return function(err) {
		if (err) next(err);
	}
};

var getMiddleware = function (gen) {
	return function (req, res, next) {
		var args = Array.prototype.slice.call(arguments);
		return co(gen).apply(null, args.concat(getErrorHandler(next)));
	};
};

module.exports = getMiddleware;