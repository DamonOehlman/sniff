# sniff

This is a simple wrapper to [Angus Croll's](http://twitter.com/angusTweets) `typeOf` function defined in his article [Fixing the Javascript typeof operator](http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/).

Additionally, it includes a subsequent test to determine whether a function is a functional prototype, and therefore something that would be suitable for calling with the `new` operator.  A value of `prototype` is returned from the function in event that:

- the target has been detected as a `function` through Angus's previous logic
- the `prototype` of the function has some keys defined on it.  While this is not a conclusive test (suggestions definitely welcome) I think it covers most of the cases where people are using JS prototypes in their code.

As always, feedback would be greatly appreciated.  For example usage check the tests and have a look at the code.