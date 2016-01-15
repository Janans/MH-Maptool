var defaultOptions = {
		'countHarvest' : false,
		'roundHarvs' : 3,
		'harvsButtonAll' : true,
		'harvsButtonStuff' : false,
		'harvsButtonFixed' : false,
		'harvsButtonMinus' : true,
		'harvsFixed' : 1,
		'harvsMinus' : 1,
		'defaultButton' : 'native',
		'harvsLastLoad' : false, 
		'useDefault' : 'navDefault'
	};

chrome.storage.sync.get(defaultOptions, function(options) {

	var optionsText = 
		'var maptool = maptool || {}; '+
		'maptool.options = '+ JSON.stringify(options) +';'
		;

	var op = document.createElement('script');
	op.id = 'maptool-options';
	op.innerHTML = optionsText;
	op.onload = function() {
	//    this.parentNode.removeChild(this);
	};

	var d = document.createElement('script');
	d.src = chrome.extension.getURL("countdebris.js");
	d.id = 'maptool-countdebris';
	d.onload = function() {
	//	this.parentNode.removeChild(this);
	};

	var c = document.createElement('script');
	c.src = chrome.extension.getURL("calcharvest.js");
	c.id = 'maptool-calcharvest';
	c.onload = function() {
	//	this.parentNode.removeChild(this);
	};

	document.body.appendChild(op);
	document.body.appendChild(d);
	document.body.appendChild(c);
	
});
