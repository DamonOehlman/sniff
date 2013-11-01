# sniff

This is a simple wrapper to [Angus Croll's](http://twitter.com/angusTweets)
`typeOf` function defined in his article
[Fixing the Javascript typeof operator](http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/).


[![NPM](https://nodei.co/npm/sniff.png)](https://nodei.co/npm/sniff/)

[![Build Status](https://travis-ci.org/DamonOehlman/sniff.png?branch=master)](https://travis-ci.org/DamonOehlman/sniff)

## Why Sniff?

Packaged as a module, sniff is ultraconvenient.

Additionally, it includes a subsequent test to determine whether a function
is a functional prototype, and therefore something that would be suitable
for calling with the `new` operator.  A value of `prototype` is returned
from the function in event that:

- the target has been detected as a `function` through Angus's
  previous logic

- the `prototype` of the function has some keys defined on it.  While this
  is not a conclusive test (suggestions definitely welcome) I think it
  covers most of the cases where people are using JS prototypes in their
  code.

## Detecting Function Signature Helper

A small helper has been added to sniff to assist with the process of
determining the function signature that a function has been called with.
This code was written to help with those cases where you have a function
that might be called with a variety of different combinations and
permutations.

In simple cases, while you might do something like the following:

```js
function example(name, opts, callback) {
  if (typeof opts == 'function') {
    callback = opts;
    opts = {};
  }

  // rest of your function here
}
```

This can get tiresome and somewhat error prone when you have more
complicated functions.  This is where the `sniff.args` helper can come in
handy.

For example, this next function is designed to be called with just a name,
or a name and an age, or name, age and callback, etc, etc.  While writing a
function like this would probably generally be discouraged in JS every now
and again they are needed.

Anyway, let's take a look:

```js
var sniff = require('sniff');

function example(name, age, opts, callback) {
  // first analyse the arguments and get a matcher function
  var matchSig = sniff.args(arguments);

  // check for the name, age and callback case
  if (matchSig('string', 'number|string', 'function')) {
    // remap opts
    callback = opts;
    opts = {};
  }
  // or the name, opts, function case
  else if (matchSig('string', 'object', 'function')) {
    // remap age, opts, and the callback
    callback = opts,
    opts = age;
    age = null;
  }
}

```

__NOTE:__ The `sniff.args` function helper is deprecated, as I believe
this can probably be done a better way, and will have a look at it one
day...

## License(s)

### MIT

Copyright (c) 2013 Damon Oehlman <damon.oehlman@gmail.com>

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
