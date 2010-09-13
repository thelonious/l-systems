/*****
*
*   Bounds.js
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
Bounds.VERSION = 1.0;

// make object eval-proof
window.Bounds = Bounds;


/*****
*
*   constructor
*
*****/
function Bounds(x, y) {
    if ( arguments.length > 0 ) this.init(x, y);
}


/*****
*
*   init
*
*****/
Bounds.prototype.init = function(x, y) {
    this.minX = x;
    this.maxX = x;
    this.minY = y;
    this.maxY = y;
};


/*****
*
*   includePoint
*
*****/
Bounds.prototype.includePoint = function(x, y) {
    if ( x < this.minX ) this.minX = x;
    if ( x > this.maxX ) this.maxX = x;
    if ( y < this.minY ) this.minY = y;
    if ( y > this.maxY ) this.maxY = y;
};


/*****
*
*   toViewbox
*
*****/
Bounds.prototype.toViewbox = function() {
    var width = this.maxX - this.minX;
    var height = this.maxY - this.minY;

    return [this.minX, this.minY, width, height].join(" ");
};


/*****  get/set methods *****/

Bounds.prototype.getWidth = function() {
    return (this.maxX - this.minX);
};
Bounds.prototype.getHeight = function() {
    return (this.maxY - this.minY);
};

