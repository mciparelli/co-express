**co-express** is an express wrapper that enables generators to be used as middlewares.

[![NPM version](https://badge.fury.io/js/co-express.png)](http://badge.fury.io/js/co-express) [![Build Status](https://travis-ci.org/mciparelli/co-express.png?branch=master)](https://travis-ci.org/mciparelli/co-express) [![Dependency Status](https://david-dm.org/mciparelli/co-express.png)](https://david-dm.org/mciparelli/co-express) [![devDependency Status](https://david-dm.org/mciparelli/co-express/dev-status.png)](https://david-dm.org/mciparelli/co-express#info=devDependencies)

## Usage

**co-express** lets you write your express routes by using generator functions as middlewares.
Like this:

```js
var fs = require('mz/fs');
var express = require('express');
var wrap = require('co-express');

var app = express();

app.get('/', wrap(function* (req, res) {
  var packageContents = yield fs.readFile('./package.json', 'utf8');
  res.send(packageContents);
}));

app.listen(8000);
```

You can also define multiple generator functions just the [express](https://github.com/visionmedia/express) way, as long as you wrap them and call `next()`:

```js
app.get('/users', wrap(function* (req, res, next) {
  req.users = yield db.getUsers();
  next();
}), wrap(function* (req, res) {
  res.send(req.users);
}));
```

## Installation

```bash
$ npm install co-express
```

## License

(The MIT License)

Copyright (c) 2013 Martín Ciparelli &lt;mciparelli@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
