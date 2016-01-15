var maptool = maptool || {};

maptool.options = maptool.options || {
		'countHarvest' : true,
		'roundHarvs' : 3,
		'harvsButtonAll' : true,
		'harvsButtonStuff' : false,
		'harvsButtonFixed' : false,
		'harvsButtonMinus' : true,
		'harvsFixed' : 1,
		'harvsMinus' : 1,
		'defaultButton' : 'all',
		'harvsLastLoad' : true,
		'useDefault' : 'navLocalDefault'
};

maptool.modifyNav = function(navPanel) {
	var debris, harvs, harvestButt, buttonP, lp, link,
		buttons = '',
		lastLoad = '',
		defButtonText = ' default" data-kb="13" data-kb-text="Enter"',
		addButtons = (maptool.options.harvsButtonAll ||
					maptool.options.harvsButtonMinus ||
					maptool.options.harvsButtonStuff);
					

	debris = navPanel.find('.scroll_y');
	if (maptool.options.countHarvest && debris.length) {

		harvs = maptool.countDebris(debris);
		
		if (maptool.options.harvsLastLoad) {
			lastLoad = ' <span class="yellow"> last: '+ harvs.last +'</span>';
		}
		
		if (maptool.options.harvsMinus > 1) {
			harvs.minus = harvs.minus + 1 - maptool.options.harvsMinus;
			if (harvs.minus < 1) {harvs.minus = 1};
		}
		
		debris.after('<p>harvester loads = <b>'+ harvs.exact + '</b>' + lastLoad + '</p>');

		harvestButt = navPanel.find('a.button.default');
		buttonP = navPanel.find('a.button.default').parent();
		lp = harvestButt.attr('href').match(/.*sid=(\d+)&mid=(\d+)&q=(\d+)/);
		link = '<a href="Building.aspx?sid='+lp[1]+'&mid='+lp[2]+'&q=';

		harvestButt.replaceWith(link +
		(addButtons ? lp[3] : harvs.all) +'" class="button'+
		((maptool.options.defaultButton === 'native') ? defButtonText : '"') +
		'" tabindex="2">'+ harvestButt.text() + '<span></span></a>');

		if (maptool.options.harvsButtonAll) {
			buttons += link + harvs.all + '" class="button' +
			((maptool.options.defaultButton === 'all') ? defButtonText : '"') +
			'>Harvest All<span></span></a> ';
		};

		if (maptool.options.harvsButtonStuff) {
			buttons += link + harvs.stuff + '" class="button' +
			((maptool.options.defaultButton === 'stuff') ? defButtonText : '"') +
			'>Items only<span></span></a> ';
		};
		
		if (maptool.options.harvsButtonFixed) {
			buttons += link + maptool.options.harvsFixed + '" class="button' +
			((maptool.options.defaultButton === 'fixed') ? defButtonText : '"') +
			'>Send '+ maptool.options.harvsFixed +' harvs<span></span></a> ';
		};

		if (maptool.options.harvsButtonMinus) {
			buttons += link + harvs.minus + '" class="button' +
			((maptool.options.defaultButton === 'minus') ? defButtonText : '"') +
			'>Harvest -'+ maptool.options.harvsMinus +'<span></span></a> ';
		};

		if (addButtons) {
			buttons ='<p>' + buttons + '</p>';
		};

		buttonP.after(buttons);
	};
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
