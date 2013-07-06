var sniff = require('..'),
    expect = require('chai').expect;
    
describe('type tests', function() {
    it('detect array', function() {
        expect(sniff([])).to.equal('array');
    });
    
    it('detect object', function() {
        expect(sniff({})).to.equal('object');
    });
    
    it('detect string', function() {
        expect(sniff('test')).to.equal('string');
    });
    
    it('detect string (created poorly)', function() {
        expect(sniff(new String('test'))).to.equal('string');
    });
    
    it('detect number (integer)', function() {
        expect(sniff(5)).to.equal('number');
    });
    
    it('detect number (float)', function() {
        expect(sniff(5.2)).to.equal('number');
    });
    
    it('detect error', function() {
        expect(sniff(new Error('test error'))).to.equal('error');
    });
    
    it('detect regex', function() {
        expect(sniff(/\w+/)).to.equal('regexp');
    });
});