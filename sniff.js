(function (glob) {
    // toType function from http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
    // follow @angusTweets for more useful stuff like this...
    function toType(obj) {
      return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }
    
    
    function sniff(target) {
        var type = toType(target),
            protokeys = [], key;
        
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

    (typeof module != "undefined" && module.exports) ? (module.exports = sniff) : (glob.eve = sniff);
})(this);