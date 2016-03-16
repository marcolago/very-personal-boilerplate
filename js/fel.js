/*
######## ######## ##
##       ##       ##
##       ##       ##
######   ######   ##
##       ##       ##
##       ##       ##
##       ######## ########
*/

var felBackgrounds;
var felBackgroundsParallaxed;
var felFirstRunned = false;
var felEnabled = false;
var backgroundParallaxSpeed = 1.5;
var felHoverables;
var minScale = 0.5;
var maxScale = 1;
var deltaScale = maxScale - minScale;
var transformName = _getPrefixed("transform");
var filterName = _getPrefixed("filter");
var zoomLock = 15;

var debug = document.querySelector(".debug");

// Mobile Check

var felIsMobile = (function() {
  var ret = {};
  ret.Android = navigator.userAgent.match(/Android/i) !== null;
  ret.BlackBerry = navigator.userAgent.match(/BlackBerry/i) !== null;
  ret.iPhone = navigator.userAgent.match(/iPhone|iPod/i) !== null;
  ret.iPad = navigator.userAgent.match(/iPad/i) !== null;
  ret.iOS = (ret.iPhone || ret.iPad);
  ret.Opera = navigator.userAgent.match(/Opera Mini/i) !== null;
  ret.Windows = navigator.userAgent.match(/IEMobile/i) !== null;
  ret.any = (ret.Android || ret.BlackBerry || ret.iOS || ret.Opera || ret.Windows);
  return ret;
})();

if (true) { //Modernizr.testAllProps('transition')) {

  felBackgrounds = document.querySelectorAll(".background");
  felBackgroundsParallaxed = document.querySelectorAll(".background-parallax");
  felHoverables = document.querySelectorAll(".hoverable");
  setFel();

}

function setFel() {

  if (felIsMobile.any !== true) {
    felEnabled = true;
  }

  setTimeout(function() {
    onScrollFel(null, 0.6);
  }, 150);

  // this horrible patch is for a layout delay problem in Chrome. Ah! Crome!
  setTimeout(function() {
    if (felFirstRunned === false) {
      onScrollFel(null, 0.1);
    }
  }, 500);

}

function doFel(cached) {
  felFirstRunned = false;
  onScrollFel(null, 0.1);
}

function onScrollFel(e, delay) {
  felFirstRunned = true;
  var initialDelay = delay || 0;
  var itemCounter = 0;
  if (felIsMobile.any === true) {

    document.body.classList.add("non-hoverable");

  } else {

    for (var i = 0; i < felHoverables.length; i++) {
      var hRef = window.innerHeight; //item.parentNode.getBoundingClientRect().height;
      var hoverable = felHoverables[i];
      var ho = hoverable.getBoundingClientRect();
      if (ho.top < hRef && ho.top + ho.height > 0) {
        hoverable.classList.add("hovered");
      } else {
        hoverable.classList.remove("hovered");
      }
    }
    //
    for (var i = 0; i < felBackgrounds.length; i++) {
      var item = felBackgrounds[i];
      var itemParallaxed = felBackgroundsParallaxed[i];
      var bb = item.getBoundingClientRect();
      var delta = (bb.height - window.innerHeight) / 2;
      var hRef = window.innerHeight; //item.parentNode.getBoundingClientRect().height;
      if (bb.top > -hRef && bb.top < hRef) {
        var v = Math.round((((bb.top + delta) * -1) * (100 + zoomLock)) / (window.innerHeight) * backgroundParallaxSpeed);
        //itemParallaxed.style[transformName] = "translate3D(0px," + v + "px, 0px)";
        //if (i === 1) { console.log(v); }
        // var scale = Math.min(Math.max(minScale, 1 - (Math.abs(v) / 100) + 0.2), maxScale);
        var scale = Math.min(maxScale, maxScale - (deltaScale * (Math.abs(v) / 100)) + 0.2);
        itemParallaxed.style[transformName] = "scale(" + scale + ")" + "translateY(" + v + "px) translateZ(0px)";
      }
    }

  }

}

/*
 ######   ######  ########   #######  ##       ##       
##    ## ##    ## ##     ## ##     ## ##       ##       
##       ##       ##     ## ##     ## ##       ##       
 ######  ##       ########  ##     ## ##       ##       
      ## ##       ##   ##   ##     ## ##       ##       
##    ## ##    ## ##    ##  ##     ## ##       ##       
 ######   ######  ##     ##  #######  ######## ######## 
*/

var touchmoved = false;
var ticking = false;
var scrollDebounce = true;
//

// addEvent(document, "touchmove", onTouchMove);
addEvent(document, "scroll", onScroll);

/*function onTouchMove() {
  doScroll();
}*/

function onScroll(e) {
  if (scrollDebounce === true) {
    scrollDebouncerTimeout = setTimeout(function() { scrollDebounce = true; }, 50);
    scrollDebounce = false;
  }
  doScroll();
}

function doScroll() {
  if (scrollDebounce === false) {
    ticker(); 
  }
}

function ticker() {
  if (ticking === false) {
    requestAnimFrame(updateRaf);
  }
  ticking = true;
}

function updateRaf() {
  ticking = false;
  if (felEnabled === true) {
    onScrollFel();
  }
}