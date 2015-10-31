/* @todo: silly, but it seems easier to just coppy defaultOptions here 
than actually get them from backgroundPage, errr....
*/

var defaultOptions = {
		'gridLines' : true,
		'portals' : false,
		'gridLinesColor' : '#8f18b4',
		'gridPortalColor' : '#ef5884',
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
	};
	
	if (!options.useDefault) {
		var st = document.createElement('style');
		st.innerHTML = 
			'#map .panellines' +
			' {border-color: ' + options.gridLinesColor + ';} ' +
			'#map .panellines.north-portal' +
			' {border-top-color: ' + options.gridPortalColor + ';} ' +
			'#map .panellines.west-portal' +
			' {border-left-color: ' + options.gridPortalColor + ';}';
		document.head.appendChild(st);
	};
	
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
