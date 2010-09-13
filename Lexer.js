/*****
*
*   Lexer.js
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
Lexer.VERSION = 1.0;

// make object eval-proof
window.Lexer = Lexer;


/*****
*
*   constructor
*
*****/
function Lexer(source) {
    if ( arguments.length > 0 ) this.init(source);
}


/*****
*
*   init
*
*****/
Lexer.prototype.init = function(source) {
    this.source = source;
    this.index = -1;
    this.length = this.source.length;
    this.currentToken = null;
};


/*****
*
*   advance
*
*****/
Lexer.prototype.advance = function() {
    this.index++;

    if ( this.index >= this.length )
        this.currentToken = null;
    else
        this.currentToken = this.source.substr(this.index, 1);
};


/*****
*
*   lookahead
*
*****/
Lexer.prototype.lookahead = function() {
    var result = null;
    
    if ( this.index+1 < this.length )
        result = this.source.substr(this.index+1, 1);

    return result;
};
