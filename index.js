var co = require('co');
var methods = require('methods');
var wrapper = function (app) {
	var routeWrapper = function (route) {
		return function (path, generatorFunction) {
			return route.bind(app)(path, function (req, res) {
				co(generatorFunction, req, res);
			});
		};
	}
	for (var i = 0; i < methods.length; i++) {
		var method = methods[i];
		app[method] = routeWrapper(app[method]);
	}
	return app;
}
module.exports = wrapper;