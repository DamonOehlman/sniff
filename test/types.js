var sniff = require('..');
var test = require('tape');

test('array', function(t) {
  t.plan(1);
  t.equal(sniff([]), 'array');
});

test('object', function(t) {
  t.plan(1);
  t.equal(sniff({}), 'object');
});

test('string', function(t) {
  t.plan(1);
  t.equal(sniff('test'), 'string');
});

test('new String', function(t) {
  t.plan(1);
  t.equal(sniff(new String('test')), 'string');
});

test('number (integer)', function(t) {
  t.plan(1);
  t.equal(sniff(5), 'number');
});

test('number (float)', function(t) {
  t.plan(1);
  t.equal(sniff(5.2), 'number');
});

test('error', function(t) {
  t.plan(1);
  t.equal(sniff(new Error('test error')), 'error');
});

test('regex', function(t) {
  t.plan(1);
  t.equal(sniff(/\w+/), 'regexp');
});