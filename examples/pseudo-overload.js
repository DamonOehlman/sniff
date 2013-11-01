var sniff = require('..');

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
