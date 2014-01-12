var express = require('express'),
    wrapper = require('../index'),
    should = require('should'),
    request = require('supertest');

function asyncText(err, text, cb) {
  setImmediate(function() {
    cb(err, text);
  });
}

function thunk(err, text) {
  return function(cb) {
    asyncText(err, text, cb);
  };
}

describe('co-express', function() {
  it('supports multiple generator/function routes', function(done) {
    var app = wrapper(express());

    app.get('/', function* (req, res, next) {
      req.val = yield thunk(null, 'thunk');
      next();
    }, function* (req, res, next) {
      req.val += yield thunk(null, 'thunk');
      next();
    }, function(req, res) {
      res.send(req.val + 'func');
    });

    request(app)
      .get('/')
      .end(function(err, res) {
        should.not.exist(err);
        res.text.should.equal('thunkthunkfunc');
        done();
      });
  });

  it('passes uncaught exceptions', function(done) {
    var app = wrapper(express());

    app.get('/', function* (req, res, next) {
      var val = yield thunk(new Error('thunk error'));
      res.send(val);
    });

    app.use(function(err, req, res, next) {
      if (err && err.message === 'thunk error') {
        res.send('caught');
      } else {
        next(err);
      }
    });

    request(app)
      .get('/')
      .end(function(err, res) {
        should.not.exist(err);
        res.text.should.equal('caught');
        done();
      });
  });
});
