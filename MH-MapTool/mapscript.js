var s = document.createElement('script');
s.src = chrome.extension.getURL("maptool.js");
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

var d = document.createElement('div');
d.id = 'debrisdiplay'; 
d.innerHTML = 'It is here';

document.documentElement.appendChild(d);


