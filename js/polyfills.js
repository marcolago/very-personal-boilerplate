/**
 * classList polyfill
 */

(function () {

if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

// adds indexOf to Array prototype for IE support
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    }
}

var prototype = Array.prototype,
    indexOf = prototype.indexOf,
    slice = prototype.slice,
    push = prototype.push,
    splice = prototype.splice,
    join = prototype.join;

function DOMTokenList(el) {  
  this._element = el;
  if (el.className != this._classCache) {
    this._classCache = el.className;

    if (!this._classCache) return;
    
      // The className needs to be trimmed and split on whitespace
      // to retrieve a list of classes.
      this._classCache = this._classCache.toString();
      var classes = this._classCache.replace(/^\s+|\s+$/g,'').split(/\s+/),
        i;
    for (i = 0; i < classes.length; i++) {
      push.call(this, classes[i]);
    }
  }
};

function setToClassName(el, classes) {
  el.className = classes.join(' ');
}

DOMTokenList.prototype = {
  add: function(token) {
    if(this.contains(token)) return;
    push.call(this, token);
    setToClassName(this._element, slice.call(this, 0));
  },
  contains: function(token) {
    return indexOf.call(this, token) !== -1;
  },
  item: function(index) {
    return this[index] || null;
  },
  remove: function(token) {
    var i = indexOf.call(this, token);
     if (i === -1) {
       return;
     }
    splice.call(this, i, 1);
    setToClassName(this._element, slice.call(this, 0));
  },
  toString: function() {
    return join.call(this, ' ');
  },
  toggle: function(token) {
    if (!this.contains(token)) {
      this.add(token);
    } else {
      this.remove(token);
    }

    return this.contains(token);
  }
};

window.DOMTokenList = DOMTokenList;

function defineElementGetter (obj, prop, getter) {
  if (Object.defineProperty) {
    Object.defineProperty(obj, prop,{
      get : getter
    })
  } else {          
    obj.__defineGetter__(prop, getter);
  }
}

defineElementGetter(Element.prototype, 'classList', function () {
  return new DOMTokenList(this);      
});

})();

/**
 * bind polyfill
 */
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
 
    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };
 
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
 
    return fBound;
  };
}

/**
 * window.getComputedStyle polyfill
 * https://github.com/jonathantneal/Polyfills-for-IE8/blob/master/getComputedStyle.js
 */

// getComputedStyle
!('getComputedStyle' in this) && (this.getComputedStyle = (function () {
  function getPixelSize(element, style, property, fontSize) {
    var
    sizeWithSuffix = style[property],
    size = parseFloat(sizeWithSuffix),
    suffix = sizeWithSuffix.split(/\d/)[0],
    rootSize;

    fontSize = fontSize != null ? fontSize : /%|em/.test(suffix) && element.parentElement ? getPixelSize(element.parentElement, element.parentElement.currentStyle, 'fontSize', null) : 16;
    rootSize = property == 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;

    return (suffix == 'em') ? size * fontSize : (suffix == 'in') ? size * 96 : (suffix == 'pt') ? size * 96 / 72 : (suffix == '%') ? size / 100 * rootSize : size;
  }

  function setShortStyleProperty(style, property) {
    var
    borderSuffix = property == 'border' ? 'Width' : '',
    t = property + 'Top' + borderSuffix,
    r = property + 'Right' + borderSuffix,
    b = property + 'Bottom' + borderSuffix,
    l = property + 'Left' + borderSuffix;

    style[property] = (style[t] == style[r] == style[b] == style[l] ? [style[t]]
    : style[t] == style[b] && style[l] == style[r] ? [style[t], style[r]]
    : style[l] == style[r] ? [style[t], style[r], style[b]]
    : [style[t], style[r], style[b], style[l]]).join(' ');
  }

  function CSSStyleDeclaration(element) {
    var
    currentStyle = element.currentStyle,
    style = this,
    fontSize = getPixelSize(element, currentStyle, 'fontSize', null);

    for (property in currentStyle) {
      if (/width|height|margin.|padding.|border.+W/.test(property) && style[property] !== 'auto') {
        style[property] = getPixelSize(element, currentStyle, property, fontSize) + 'px';
      } else if (property === 'styleFloat') {
        style['float'] = currentStyle[property];
      } else {
        style[property] = currentStyle[property];
      }
    }

    setShortStyleProperty(style, 'margin');
    setShortStyleProperty(style, 'padding');
    setShortStyleProperty(style, 'border');

    style.fontSize = fontSize + 'px';

    return style;
  }

  CSSStyleDeclaration.prototype = {
    constructor: CSSStyleDeclaration,
    getPropertyPriority: function () {},
    getPropertyValue: function ( prop ) {
      return this[prop] || '';
    },
    item: function () {},
    removeProperty: function () {},
    setProperty: function () {},
    getPropertyCSSValue: function () {}
  };

  function getComputedStyle(element) {
    return new CSSStyleDeclaration(element);
  }

  return getComputedStyle;
})(this));



/**
 * requestAnimationFrame polyfill
 */
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame    || 
      window.oRequestAnimationFrame      || 
      window.msRequestAnimationFrame     || 
      function( callback ){
      window.setTimeout(callback, 1000 / 60);
      };
})();

// usage: 
// instead of setInterval(render, 16) ....

/**
 * addeventlistener
 */
function addEvent(element, type, callback, useCapture) {
  var capture = useCapture === true ? true : false;
  if (element.addEventListener) {
    element.addEventListener(type, callback, capture);
  } else {
    element.attachEvent("on"+type, callback);
  }
}

/**
########  ########  ######## ######## #### ##     ## ######## ########  
##     ## ##     ## ##       ##        ##   ##   ##  ##       ##     ## 
##     ## ##     ## ##       ##        ##    ## ##   ##       ##     ## 
########  ########  ######   ######    ##     ###    ######   ########  
##        ##   ##   ##       ##        ##    ## ##   ##       ##   ##   
##        ##    ##  ##       ##        ##   ##   ##  ##       ##    ##  
##        ##     ## ######## ##       #### ##     ## ######## ##     ## 
*/

var cssPrefixes = ["", "-webkit-", "-moz-", "-ms-", "-o-"];

/**
 * returns the Style Collection Object
 */
function _getStyleObject() {
    if (window.getComputedStyle) {
        return window.getComputedStyle(document.body);
    } else {
        return document.documentElement.style;
    }
}
// cache a Style Collection Object for future use
var styleObject = _getStyleObject();
/**
 * returns the standard or the prefixed CSS property
 * use: element[Brav1Toolbox.getPrefixed(CSSProperty)];
 */
function _getPrefixed(prop) {
    var o = styleObject || _getStyleObject();
    for (var i = 0; i < cssPrefixes.length; i++) {
        var pre = cssPrefixes[i].replace(/-/g, "");
        var p = prop;
        if (pre.length > 0) {
            p = p.charAt(0).toUpperCase() + p.substr(1);
        }
        p = pre + p;
        if (p in o == true) {
            return p;
        }
    }
    return "";
}

