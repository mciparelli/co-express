**co-express** is an express wrapper that enables generators to be used as middlewares.

## Usage

**co-express** lets you write your express routes by using generator functions as middlewares.
Like this:

```js
var fs = require('fs');
var co = require('co');
var express = require('express');
var wrapper = require('co-express');
var app = wrapper(express());
app.get('/', function* (req, res) {
  var read = co.wrap(fs.readFile);
  var packageContents = yield read('./package.json', 'utf8');
  res.send(packageContents);
});
app.listen(8000);
```

## Installation

    $ npm install co-express

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