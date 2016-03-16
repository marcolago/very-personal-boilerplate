/*
##     ## ######## #### ##        ######  
##     ##    ##     ##  ##       ##    ## 
##     ##    ##     ##  ##       ##       
##     ##    ##     ##  ##        ######  
##     ##    ##     ##  ##             ## 
##     ##    ##     ##  ##       ##    ## 
 #######     ##    #### ########  ######  
*/

var domainLevels = 2;
var domain = document.location.host;
var domArraySplitted = domain.split(".");
domain = ".";
for (var i = domainLevels; i > 0; i--) {
  domain += domArraySplitted[domArraySplitted.length - i] + (i > 1 ? "." : "");
}
console.log(domain);

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/; domain=" + domain + ";";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}

/*
 ######   #######   #######  ##    ## #### ########  ######  
##    ## ##     ## ##     ## ##   ##   ##  ##       ##    ## 
##       ##     ## ##     ## ##  ##    ##  ##       ##       
##       ##     ## ##     ## #####     ##  ######    ######  
##       ##     ## ##     ## ##  ##    ##  ##             ## 
##    ## ##     ## ##     ## ##   ##   ##  ##       ##    ## 
 ######   #######   #######  ##    ## #### ########  ######  
*/

var cookieDismissedName = "cookiedismissed"
var cookieMessageDismissed = readCookie(cookieDismissedName);
var cookieModalMessage = document.querySelector(".cookie-modal-message");
var cookieConfirmMessage;
var cookieMessageClose;

if (cookieModalMessage) {
  addEvent(document, "click", onCookieMessageClose);
  addEvent(document, "touchstart", onCookieMessageClose);
  cookieMessageClose = cookieModalMessage.querySelector(".modal__close");
  // console.log(cookieMessageDismissed);
  if (cookieMessageDismissed == "true" || document.location.href.indexOf("#cookie") != -1) {
    removeCookieMessage();
  } else {
    addEvent(cookieMessageClose, "click", onCookieMessageClose);
  }
}

function onCookieMessageClose(e) {
  if (cookieMessageDismissed != "true") {
    cookieMessageDismissed = "true";
    createCookie(cookieDismissedName, "true", 365);
    hideCookieMessage();
  }
}

function hideCookieMessage() {
  cookieModalMessage.classList.add("hiding");
  setTimeout(removeCookieMessage, 600);
}

function removeCookieMessage() {
  cookieModalMessage.parentNode.removeChild(cookieModalMessage);
}