var sniff = require('../sniff'),
    expect = require('chai').expect;
    
function check(args, types) {

    function checkArgs() {
        var matcher = sniff.args(arguments);
        
        expect(matcher.apply(null, types)).to.be.ok;
    }
    
    checkArgs.apply(null, args);
}
    
describe('argument helper tests', function() {
    it('can detect string arguments', function() {
        check(['a', 'b', 'c'], ['string', 'string', 'string']);
    });

    it('can detect boolean arguments', function() {
        check([true, false], ['boolean', 'boolean']);
    });
    
    it('can detect numeric arguments', function() {
        check([1, 2, 3], ['number', 'number', 'number']);
    });
    
    it('can detect numeric (float) arguments', function() {
        check([10.1, 20.2], ['number', 'number']);
    });
    
    it('can detect array arguments', function() {
        check([1, []], ['number', 'array']);
    });
    
    it('can detect object arguments', function() {
        check([[], {}], ['array', 'object']);
    });
    
    it('can detect function arguments', function() {
        check([{}, function() {}], ['object', 'function']);
    });
    
    it('or syntax - no spaces', function() {
        check([2], ['number|string']);
        check(['2'], ['number|string']);
    });
    
    it('or syntax - leading spaces', function() {
        check([2], ['number |string']);
        check(['2'], ['number |string']);
    });
    
    it('or syntax - trailing spaces', function() {
        check([2], ['number| string']);
        check(['2'], ['number| string']);
    });
    
    it('or syntax - leading and trailing spaces', function() {
        check([2], ['number | string']);
        check(['2'], ['number | string']);
    });
    
    it('or syntax - multiple arguments', function() {
        check([2, 2], ['number|string', 'number|string']);
        check([2, '2'], ['number|string', 'number|string']);
        check(['2', 2], ['number|string', 'number|string']);
        check(['2', '2'], ['number|string', 'number|string']);
    });
});