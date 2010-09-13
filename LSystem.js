/*****
*
*   LSystem.js
*
*   copyright 2002, Kevin Lindsey
*   licensing info available at: http://www.kevlindev.com/license.txt
*
*****/

/*****
*
*   class variables
*
*****/
LSystem.VERSION = 1.0;

// make object eval-proof
window.LSystem = LSystem;


/*****
*
*   constructor
*
*****/
function LSystem(rules) {
    if ( arguments.length > 0 ) this.init(rules);
}


/*****
*
*   init
*
*****/
LSystem.prototype.init = function(rules) {
    this.rules = rules;
};


/*****
*
*   generate
*
*****/
LSystem.prototype.generate = function(start, iters) {
    var rules = this.rules;
    var result = start;
    var lhss = [];

    for ( var p in this.rules ) lhss.push(p);

    /*
    for ( var i = 0; i < iters; i++ ) {
        var pieces = [];

        for ( var c = 0; c < result.length; c++ ) {
            var char = result.substr(c,1);

            if ( rules[char] != null )
                pieces.push(rules[char]);
            else
                pieces.push(char);
        }

        result = pieces.join("");
    }
    */
    
    var regex = new RegExp( "(" + lhss.join("|") + ")", "g");
    for ( var i = 0; i < iters; i++ )
        result = result.replace(regex, function(data) { return rules[data]; });

    return result;
};

