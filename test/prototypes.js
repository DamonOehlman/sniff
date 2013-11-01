var sniff = require('..');
var test = require('tape');

function PingPong() {
  this.size = 5;
}

PingPong.prototype.ping = function() {
  return 'pong';
};

function CustomPonger() {
  PingPong.call(this);
  this.size = 10;
}

CustomPonger.prototype = new PingPong();
CustomPonger.prototype.constructor = CustomPonger;

test('detect custom prototype', function(t) {
  t.plan(1);
  t.equal(sniff(PingPong), 'prototype');
});

test('detect extended prototype', function(t) {
  t.plan(1);
  t.equal(sniff(CustomPonger), 'prototype');
});