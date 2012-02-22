var sniff = require('../sniff'),
    expect = require('chai').expect;
    
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
    
describe('prototype tests', function() {
    it('should be able to detect when a custom prototype has been used', function() {
        expect(sniff(PingPong)).to.equal('prototype');
    });
    
    it('should be able to type extends another prototype', function() {
        expect(sniff(CustomPonger)).to.equal('prototype');
    });
});