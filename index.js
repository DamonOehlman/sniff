/**
  # sniff

  This is a simple wrapper to [Angus Croll's](http://twitter.com/angusTweets)
  `typeOf` function defined in his article
  [Fixing the Javascript typeof operator](http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/).

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

  <<< examples/pseudo-overload.js

  __NOTE:__ The `sniff.args` function helper is deprecated, as I believe
  this can probably be done a better way, and will have a look at it one
  day...

**/
(function (glob) {
  var rePipeDelim = /\s*\|\s*/;

  // toType function from http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
  // follow @angusTweets for more useful stuff like this...
  function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function sniff(target) {
    var type = toType(target);
    var protokeys = [];
    var key;

    // if the type is a function, then let's do a little more poking around
    if (type == 'function') {
      if (typeof Object.keys == 'function') {
        protokeys = Object.keys(target.prototype);
      }
      else if (target.prototype) {
        for (key in target.prototype) {
          protokeys.push(key);
        }
      }

      // if we have keys for the prototype, then change the type to 'prototype'
      if (protokeys.length > 0) {
        type = 'prototype';
      }
    }

    return type;
  }

  sniff.toType = toType;

  sniff.args = function(args) {
    var types = [];
    var ii;

    // ensure that args is an array
    args = [].slice.call(args);

    // iterate through the args and detect the type of each argument
    for (ii = args.length; ii--; ) {
      types[ii] = sniff(args[ii]);
    }

    return function() {
      var match = arguments.length === types.length;
      var okTypes;
      var jj;

      // iterate through the types and for a match against the argument
      for (ii = types.length; match && ii--; ) {
        // split the argument on the pipe character
        okTypes = arguments[ii].split(rePipeDelim);
        match = false;

        for (jj = okTypes.length; jj--; ) {
          match = match || types[ii] === okTypes[jj];
        }
      }

      return match;
    };
  };

  typeof module != "undefined" && module.exports ?
    (module.exports = sniff) :
    (glob.sniff = sniff);
})(this);