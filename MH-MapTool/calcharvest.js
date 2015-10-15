var weight = {
// weapons
		'400': 10,
		'401': 12,
		'402': 22,
		'403': 29,
		'404': 50,
		'405': 11,
		'406': 36,
		'410': 15,
		'411': 25,
		'412': 32,
		'413': 80,
		'414': 14,
		'415': 65,
		'416': 42,
		'420': 16,
		'421': 17,
		'422': 8,
		'423': 35,
		'424': 28,
		'425': 22,
		'426': 43,
		'450': 26,
		'451': 120,
		'452': 13,
		'453': 54,
// anti-building
		'430': 420,
		'431': 650,
		'432': 340,
		'454': 320,
// shields
		'500': 23,
		'501': 18,
		'502': 38,
		'503': 30,
		'510': 10,
		'511': 52,
		'512': 31,
		'513': 45,
// transport platforms
		'600': 10,
		'601': 40,
		'602': 80,
		'603': 48,
		'604': 80,
// jetpacks
		'622': 28,
		'623': 52,
		'625': 82
	};
	
function countDebris(debris) {
	var res = 0, stuff = 0, harvs = {};

	debris.find('.res').each(function(){res += parseInt($(this).text());});

	debris.find('.tiny_eq').each(function(){ 
	var id, count; 
		id = $(this).find('img').attr('src').match(/\/(\d*)\./)[1]; 
		count = parseInt($(this).find('b').text()); 
		stuff += count * weight[id];
	});
	harvs.res = Math.ceil(res/2000);
	harvs.stuff = Math.ceil(stuff/20);
	harvs.exact = (res/100 + stuff)/20;
	harvs.all = Math.ceil(harvs.exact);
	harvs.minus = Math.floor(harvs.exact) === harvs.exact ? (Math.floor(harvs.exact) - 1) : Math.floor(harvs.exact);

	return harvs;

};

function modifyNav(navPanel) {
	var debris, harvs, harvestButt, buttonP, lp;

	debris = navPanel.find('.scroll_y');
	if (debris.length) {

		harvs = countDebris(debris);
		debris.after('<p>harvester loads = <b>'+ harvs.exact +' </b></p>');

		harvestButt = navPanel.find('a.button.default');
		buttonP = navPanel.find('a.button.default').parent();
		lp = harvestButt.attr('href').match(/.*sid=(\d+)&mid=(\d+)&q=(\d+)/);

		harvestButt.replaceWith('<a href="Building.aspx?sid='+lp[1]+'&mid='+lp[2]+'&q='+lp[3]+'" class="button" tabindex="2">'+ harvestButt.text() + '<span></span></a>');
		buttonP.after('<p><a href="Building.aspx?sid='+lp[1]+'&mid='+lp[2]+'&q='+harvs.all+'" class="button default" tabindex="4" data-kb="13" data-kb-text="Enter">Harvest All<span></span></a> <a href="Building.aspx?sid='+lp[1]+'&mid='+lp[2]+'&q='+harvs.minus+'" class="button" tabindex="5">Harvest -1<span></span></a></p>');
	}
};

function calcharvest() {
	var nav = $('#navigationControl .panel.left');
	if (nav.length ) {
		modifyNav(nav);
	};
};

$(document).ready(function () { calcharvest();});

