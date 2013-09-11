var co = require('co');
var each = require('co-each');
var methods = require('methods');
var isGenerator = function(f) {
	return typeof f === 'function' && Object.getPrototypeOf(f) !== Object.getPrototypeOf(Function);
};
var getMiddleware = function (gen) {
	return !isGenerator(gen) ? gen : function (req, res, next) {
		return co(gen, req, res, next);
	};
};
var routeWrapper = function (route, context) {
	return function (path) {
		var generators = Array.prototype.slice.call(arguments, 1);
		return route.apply(context, [path].concat(each(generators, getMiddleware)));
	};
};
module.exports = function (app) {
	for (var i = 0; i < methods.length; i++) {
		var method = methods[i];
		app[method] = routeWrapper(app[method], app);
	}
	return app;
};
