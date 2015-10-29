/* @todo: silly, but it seems easier to just coppy defaultOptions here 
than actually get them from backgroundPage, errr....
*/

var defaultOptions = {
		'gridLines' : true,
		'portals' : false,
		'fieldValue' : true,
		'city' : 'none',
		'scanDebris' : false,
		'scanDelayTime' : 220,
		'keepDebrisTime' : 300,
		'rescanDebrisTime' : 1,
		'scanNpc' : false,
		'countHarvest' : false,
		'roundHarvs' : 3,
		'harvsButtonAll' : false,
		'harvsButtonStuff' : false,
		'harvsButtonMinus' : false,
		'defaultButton' : 'native',
		'useDefault' : 'mapDefault'
	};

chrome.storage.sync.get(defaultOptions, function(options) {

	var optionsText = 
		'var maptool = maptool || {}; '+
		'maptool.options = '+ JSON.stringify(options) +';'
		;

	var op = document.createElement('script');
	op.innerHTML = optionsText;
	op.onload = function() {
	//    this.parentNode.removeChild(this);
	};
	
	if (options.scanDebris) {
		var d = document.createElement('div');
		d.id = 'debrisdiplay'; 
		document.getElementById("_f0").appendChild(d);
	}
	
/* keep anything else in here just to order things... */

	var mt = document.createElement('script');
	mt.src = chrome.extension.getURL("maptool.js");
	mt.onload = function() {
	//    this.parentNode.removeChild(this);
	};

	var ch = document.createElement('script');
	ch.src = chrome.extension.getURL("countdebris.js");
	ch.onload = function() {
	//	this.parentNode.removeChild(this);
	};

	document.body.appendChild(op);
	document.body.appendChild(ch);
	document.body.appendChild(mt);

});
