
// determine rendering engine
var isWebKit = typeof navigator.userAgent.split("WebKit/")[1] !== "undefined";
var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var isMozilla = navigator.appVersion.indexOf('Gecko/') >= 0 || ((navigator.userAgent.indexOf("Gecko") >= 0) && !this.isWebKit && (typeof navigator.appVersion !== "undefined"));
if(isWebKit) {console.log("WebKit browser detected");}
if(isChrome) {console.log("Chrome browser detected");}
if(isMozilla) {console.log("Mozilla browser detected");}
if(!isWebKit && !isChrome && !isMozilla) {	// check support
	// unsupported browser, throw error
	console.error("Browser unsupported");
	//alert("Sorry, your browser is not supported. Please switch to Firefox, Chrome, or Safari");
}

