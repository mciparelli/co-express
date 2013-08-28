var co = require('co');
var methods = require('methods');
var createMiddleware = function (middlewares) {
	return function (req, res) {
		co(function* (req, res, middlewares) {
			for (var i = 0, len = middlewares.length; i < len; i++) {
				yield middlewares[i](req, res);
			}
		}, req, res, middlewares);
	};
}
var routeWrapper = function (route, context) {
	return function (path) {
		var args = [path];
		var middlewares = Array.prototype.slice.call(arguments, 1);
		if (middlewares.length) {
			args.push(createMiddleware(middlewares));
		}
		return route.apply(context, args);
	};
};
module.exports = function (app) {
	for (var i = 0; i < methods.length; i++) {
		var method = methods[i];
		app[method] = routeWrapper(app[method], app);
	}
	return app;
};