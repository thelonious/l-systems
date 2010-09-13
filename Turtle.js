/*****
*
*   Turtle.js
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
Turtle.VERSION = 1.0;

// make object eval-proof
window.Turtle = Turtle;


/*****
*
*   constructor
*
*****/
function Turtle(dirs, scale) {
    if ( arguments.length > 0 ) this.init(dirs, scale);
}


/*****
*
*   init
*
*****/
Turtle.prototype.init = function(dirs, scale) {
    var two_pi = Math.atan2(1,1) * 8;
    
    this.dirs = dirs - 1;
    this.cos = new Array(dirs);
    this.sin = new Array(dirs);
    this.scale = scale;

    for ( var i = 0; i < dirs; i++ ) {
        var angle = (i/dirs) * two_pi;

        this.cos[i] = Math.cos(angle);
        this.sin[i] = Math.sin(angle);
    }
    
    this.precision = 100;
};


/*****
*
*   interpret
*
*****/
Turtle.prototype.interpret = function(source) {
    var lexer = new Lexer(source);
    var stack = [];

    var x = 0;
    var y = 0;
    var bounds = new Bounds(x,y);
    var dir = 0;
    var rotation = 1;
    var data = [ "M0,0" ];
    var length = 1;
    var cmd;

    for ( lexer.advance(); lexer.currentToken != null; lexer.advance() ) {
        var cmd = lexer.currentToken;
        switch (cmd) {
            case "F":
                x += this.scale * length * this.cos[dir];
                y += this.scale * length * this.sin[dir];
                bounds.includePoint(x,y);
                data.push( this.round(x) + "," + this.round(y) );
                break;

            case "G":
                x += this.scale * length * this.cos[dir];
                y += this.scale * length * this.sin[dir];
                bounds.includePoint(x,y);
                data.push( " M" + this.round(x) + "," + this.round(y) );
                break;

            case "@":
                var factor = "";
                var func = "";
                var next = lexer.lookahead();

                if ( next == "I" || next == "Q" ) {
                    lexer.advance();
                    func = lexer.currentToken;
                    next = lexer.lookahead();
                }
                
                while ( next.match(/[0-9.]/) ) {
                    lexer.advance();
                    factor += lexer.currentToken;
                    next = lexer.lookahead();
                }

                switch (func) {
                    case "":
                        length *= factor;
                        break;

                    case "I":
                        length *= (1/factor);
                        break;

                    case "Q":
                        length *= Math.sqrt(factor);
                        break;
                }
                break;

            case "!":
                rotation *= -1;
                break;

            case "|":
                dir += Math.round( (this.dirs + 1) / 2);
                if ( dir > this.dirs ) dir -= (this.dirs + 1);
                break;

            case "+":
            case "-":
                if ( cmd == "+" && rotation == 1 || cmd == "-" && rotation == -1 ) {
                    dir--;
                    if ( dir < 0 ) dir = this.dirs;
                } else {
                    dir++;
                    if ( dir > this.dirs ) dir = 0;
                }
                break;

            case "[":
                stack.push( new Context(x, y, dir, length, rotation) );
                break;

            case "]":
                var state = stack.pop();

                x = state.x;
                y = state.y;
                dir = state.dir;
                length = state.length;
                rotation = state.rotation;

                data.push(" M" + this.round(x) + "," + this.round(y));
                break;
        }
    }

    return {
        bounds: bounds,
        data: data.join(" ")
    };
};


/*****
*
*   round
*
*****/
Turtle.prototype.round = function(num) {
    return Math.round(num * this.precision) / this.precision;
};

