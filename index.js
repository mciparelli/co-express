var co = require('co');

var getErrorHandler = function(next) {
	return function(err) {
		if (err) next(err);
	}
};

var getMiddleware = function (gen) {
	return function (req, res, next) {
		var args = Array.prototype.slice.call(arguments);
		return co.wrap(gen).apply(null, args).catch(getErrorHandler(next));
	};
};

module.exports = getMiddleware;
