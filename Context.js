/*****
*
*   Context.js
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
Context.VERSION = 1.0;

// make object eval-proof
window.Context = Context;


/*****
*
*   constructor
*
*****/
function Context(x, y, dir, length, rotation) {
    if ( arguments.length > 0 ) this.init(x, y, dir, length, rotation);
}


/*****
*
*   init
*
*****/
Context.prototype.init = function(x, y, dir, length, rotation) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.length = length;
    this.rotation = rotation;
};

