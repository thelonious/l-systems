/*****
*
*   Drawing.js
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
Drawing.VERSION = 1.0;

// make object eval-proof
window.Drawing = Drawing;


/*****
*
*   class methods
*
*****/
Drawing.fromNode = function(node) {
    var result;

    if ( node.tagName == "lsystem" ) {
        var name   = node.getAttribute("name");
        var axiom  = node.getAttribute("axiom");
        var scale  = node.getAttribute("scale") - 0;
        var angles = node.getAttribute("angles") - 0;
        var iters  = node.getAttribute("iters") - 0;
        var padding = node.getAttribute("padding");

        var rules = node.getElementsByTagName("rule");
        var ruleHash = {};
        for ( var i = 0; i < rules.length; i++ ) {
            var rule = rules.item(i);
            
            if ( rule.hasChildNodes() ) {
                ruleHash[rule.getAttribute("name")] = rule.firstChild.data;
            } else {
                ruleHash[rule.getAttribute("name")] = "";
            }
        }

        result = new Drawing(name, ruleHash, axiom, scale, angles, iters);

        if ( padding != null ) result.padding = padding - 0;
    }

    return result;
};


/*****
*
*   constructor
*
*****/
function Drawing(name, rules, axiom, scale, angles, iters) {
    if ( arguments.length > 0 ) this.init(name, rules, axiom, scale, angles, iters);
}


/*****
*
*   init
*
*****/
Drawing.prototype.init = function(name, rules, axiom, scale, angles, iters) {
    this.name   = name;
    this.lsystem = new LSystem(rules);
    this.axiom  = axiom;
    this.scale  = scale;
    this.angles = angles;
    this.iters  = iters;
    this.padding = 0;
};


/*****
*
*   plot
*
*****/
Drawing.prototype.plot = function() {
    var turtle = new Turtle(this.angles, this.scale);
    var data = turtle.interpret( this.lsystem.generate(this.axiom, this.iters) );
    var bounds = data.bounds;

    bounds.includePoint( bounds.minX - this.padding, bounds.minY - this.padding );
    bounds.includePoint( bounds.maxX + this.padding, bounds.maxY + this.padding );

    var svg = svgDocument.createElementNS(svgns, "svg");
    var rect = svgDocument.createElementNS(svgns, "rect");
    var path = svgDocument.createElementNS(svgns, "path");

    svg.setAttributeNS(null, "viewBox", bounds.toViewbox());
    svg.setAttributeNS(null, "preserveAspectRatio", "xMinYMin meet");

    rect.setAttributeNS(null, "x", bounds.minX);
    rect.setAttributeNS(null, "y", bounds.minY);
    rect.setAttributeNS(null, "width", bounds.getWidth());
    rect.setAttributeNS(null, "height", bounds.getHeight());
    rect.setAttributeNS(null, "fill", "antiquewhite");

    path.setAttributeNS(null, "fill", "none");
    path.setAttributeNS(null, "stroke", "black");
    path.setAttributeNS(null, "d", data.data);

    svg.appendChild(rect);
    svg.appendChild(path);

    return svg;
};
