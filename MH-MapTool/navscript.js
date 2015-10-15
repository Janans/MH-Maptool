var s = document.createElement('script');
s.src = chrome.extension.getURL("calcharvest.js");
s.onload = function() {
//	this.parentNode.removeChild(this);
};
// document.head.appendChild(s);
var body = document.getElementsByTagName('body')[0];
body.appendChild(s);
