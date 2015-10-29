var maptool = maptool || {};

maptool.options = maptool.options || {
		'countHarvest' : true,
		'roundHarvs' : 3,
		'harvsButtonAll' : true,
		'harvsButtonStuff' : false,
		'harvsButtonMinus' : true,
		'defaultButton' : 'all',
		'useDefault' : 'navLocalDefault'
};

maptool.modifyNav = function(navPanel) {
	var debris, harvs, harvestButt, buttonP, lp;

	debris = navPanel.find('.scroll_y');
	if (debris.length) {

		harvs = maptool.countDebris(debris);
		debris.after('<p>harvester loads = <b>'+ harvs.exact +' </b></p>');

		harvestButt = navPanel.find('a.button.default');
		buttonP = navPanel.find('a.button.default').parent();
		lp = harvestButt.attr('href').match(/.*sid=(\d+)&mid=(\d+)&q=(\d+)/);

// @todo: parametrize button bulding with options
		harvestButt.replaceWith('<a href="Building.aspx?sid='+lp[1]+'&mid='+lp[2]+'&q='+lp[3]+'" class="button" tabindex="2">'+ harvestButt.text() + '<span></span></a>');
		buttonP.after('<p><a href="Building.aspx?sid='+lp[1]+'&mid='+lp[2]+'&q='+harvs.all+'" class="button default" tabindex="4" data-kb="13" data-kb-text="Enter">Harvest All<span></span></a> <a href="Building.aspx?sid='+lp[1]+'&mid='+lp[2]+'&q='+harvs.minus+'" class="button" tabindex="5">Harvest -1<span></span></a></p>');
	}
};

maptool.calcharvest = function() {
	var nav = $('#navigationControl .panel.left');
	if (maptool.options.countHarvest && nav.length ) {
		maptool.modifyNav(nav);
	};
};

/* this is not funy... but both load orders are possible at random */
if ('countDebris' in maptool) {
	maptool.calcharvest();
} else {
//console.log('waiting');	
	document.getElementById('maptool-countdebris').addEventListener('load', function() {
		 maptool.calcharvest();
	});
}
