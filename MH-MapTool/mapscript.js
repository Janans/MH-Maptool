var mt = document.createElement('script');
mt.src = chrome.extension.getURL("maptool.js");
mt.onload = function() {
//    this.parentNode.removeChild(this);
};

var ch = document.createElement('script');
ch.src = chrome.extension.getURL("calcharvest.js");
ch.onload = function() {
//	this.parentNode.removeChild(this);
};


// (document.head||document.documentElement).appendChild(s);
var body = document.getElementsByTagName('body')[0];
body.appendChild(ch);
body.appendChild(mt);

var d = document.createElement('div');
d.id = 'debrisdiplay'; 

document.getElementById("_f0").appendChild(d);


