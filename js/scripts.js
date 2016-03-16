var homeHero = document.querySelector(".home-hero");
var actionFigure = document.querySelector(".action-figure");
var dartBack = document.querySelector(".dart-back");
var dartFront = document.querySelector(".dart-front");
var cookieFront = document.querySelector(".cookie-front");
var cookieDart = document.querySelector(".cookie-dart");
var cookieBack = document.querySelector(".cookie-back");
var findPlaceButton = document.querySelector(".place-find-cta");
var insertPlaceButton = document.querySelector(".place-insert-cta");
var shootTime = 750;

if (actionFigure && document.addEventListener) {
  document.addEventListener("mousemove", onActionFigureMouseMove);
}

function onActionFigureMouseMove(e) {
  var _x = e.clientX;
  var _y = e.clientY;
  var _w = window.innerWidth / 2;
  var _h = window.innerHeight / 2;
  var deltaX = _x - _w;
  var deltaY = _y - _h;
  actionFigure.style[_getPrefixed("transform")] = "rotateY(" + deltaX/60 + "deg)" + "rotateX(" + deltaY/40 + "deg)";
  dartBack.style[_getPrefixed("transform")] =     "rotateY(" + deltaX/35 + "deg)" + "rotateX(" + deltaY/40 + "deg)" + "translateX(" + (deltaX/50) + "px)" + "translateZ(" + (deltaX/10) + "px)";
  dartFront.style[_getPrefixed("transform")] =    "rotateY(" + deltaX/45 + "deg)" + "rotateX(" + deltaY/40 + "deg)" + "translateX(" + (-deltaX/50) + "px)" + "translateZ(" + (-deltaX/10) + "px)";

  cookieDart.style[_getPrefixed("transform")] = "rotateY(" + deltaX/60 + "deg)" + "rotateX(" + deltaY/20 + "deg)";
  cookieBack.style[_getPrefixed("transform")] =     "rotateY(" + deltaX/35 + "deg)" + "rotateX(" + deltaY/40 + "deg)" + "translateX(" + (deltaX/50) + "px)" + "translateZ(" + (deltaX/10) + "px)";
  cookieFront.style[_getPrefixed("transform")] =    "rotateY(" + deltaX/45 + "deg)" + "rotateX(" + deltaY/40 + "deg)" + "translateX(" + (-deltaX/50) + "px)" + "translateZ(" + (-deltaX/10) + "px)";
}

if (dartBack && dartFront && document.addEventListener) {
  findPlaceButton.addEventListener("click", onButtonNavigation);
  insertPlaceButton.addEventListener("click", onButtonNavigation);
}

function onButtonNavigation(e) {
  var t = e.target;
  var h = t.href;
  e.preventDefault();
  dartBack.classList.add("fired");
  dartFront.classList.add("fired");
  setTimeout(function() { document.location.href = h; }, shootTime);
}

/*
########  ##          ###     ######  ######## ######## ########      ######  ######## ##       ########  ######  ########  #######  ########  
##     ## ##         ## ##   ##    ##    ##    ##       ##     ##    ##    ## ##       ##       ##       ##    ##    ##    ##     ## ##     ## 
##     ## ##        ##   ##  ##          ##    ##       ##     ##    ##       ##       ##       ##       ##          ##    ##     ## ##     ## 
########  ##       ##     ##  ######     ##    ######   ########      ######  ######   ##       ######   ##          ##    ##     ## ########  
##     ## ##       #########       ##    ##    ##       ##   ##            ## ##       ##       ##       ##          ##    ##     ## ##   ##   
##     ## ##       ##     ## ##    ##    ##    ##       ##    ##     ##    ## ##       ##       ##       ##    ##    ##    ##     ## ##    ##  
########  ######## ##     ##  ######     ##    ######## ##     ##     ######  ######## ######## ########  ######     ##     #######  ##     ## 
*/

var blasterSelectorTrigger = document.querySelector(".blaster-selector-trigger");
var blasterSelectorList = document.querySelector(".blaster-selector-list");
var blasterSelectorListClose = document.querySelector(".blaster-selector-list__close");
var blastersSelected = [];

if (blasterSelectorTrigger && blasterSelectorList && blasterSelectorListClose) {
  addEvent(blasterSelectorTrigger, "click", showBlasterList);
  addEvent(blasterSelectorListClose, "click", hideBlasterList);
}

if (blasterSelectorList) {
  var blasterList = blasterSelectorList.querySelectorAll(".blaster-selector-list__item");
  for (var i = 0; i < blasterList.length; i++) {
    addEvent(blasterList[i], "click", onBlasterSelected);
  }
}

function onBlasterSelected(e) {
  var t = e.target || e.srcElement;
  if (t.getAttribute("value") !== null) {
    toggleBlaster(t);
  } else {
    toggleBlaster(t.parentNode);
  }
}

function showBlasterList(e) {
  document.body.classList.add("blaster-list-show");
}

function hideBlasterList(e) {
  document.body.classList.remove("blaster-list-show");
}

function toggleBlaster(t) {
  if (t.classList.contains("selected")) {
    t.classList.remove("selected");
    removeBlaster(t.getAttribute("value"));
  } else {
    t.classList.add("selected");
    addBlaster(t.getAttribute("value"));
  }
}

function addBlaster(blasterName) {
  blastersSelected.push(blasterName);
  console.log(blastersSelected)
}

function removeBlaster(blasterName) {
  for (var i = 0; i < blastersSelected.length; i++) {
    if (blastersSelected[i] === blasterName) {
      blastersSelected.splice(i,1);
    }
  }
  console.log(blastersSelected)
}






