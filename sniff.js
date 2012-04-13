(function (glob) {
    var rePipeDelim = /\s*\|\s*/;
    
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

    /**
    ## sniff.args(arguments)

    Return a function matcher that can be used to determine if a function has a function signature
    matching a particular type.
    */
    sniff.args = function(args) {
        var types = [], ii;
        
        // ensure that args is an array
        args = Array.prototype.slice.call(args);
        
        // iterate through the args and detect the type of each argument
        for (ii = args.length; ii--; ) {
            types[ii] = sniff(args[ii]);
        }
        
        return function() {
            var match = true;
            
            // iterate through the types and for a match against the argument
            for (ii = types.length; match && ii--; ) {
                // split the argument on the pipe character
                var okTypes = arguments[ii].split(rePipeDelim);
                
                match = false;
                for (var jj = okTypes.length; jj--; ) {
                    match = match || types[ii] === okTypes[jj];
                }
            }
            
            return match;
        };
    };

    (typeof module != "undefined" && module.exports) ? (module.exports = sniff) : (glob.eve = sniff);
})(this);