// alert("It works!");
var s = document.createElement('script');
s.src = chrome.extension.getURL("maptool.js");
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

