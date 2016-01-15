var maptool = maptool || {};

maptool.stuffWeight = {
/* weapons */
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
/* anti-building */
		'430': 420,
		'431': 650,
		'432': 340,
		'454': 320,
/* shields */
		'500': 23,
		'501': 18,
		'502': 38,
		'503': 30,
		'510': 10,
		'511': 52,
		'512': 31,
		'513': 45,
/* transport platforms */
		'600': 10,
		'601': 40,
		'602': 80,
		'603': 48,
		'604': 80,
/* jetpacks */
		'622': 28,
		'623': 52,
		'625': 82
	};


maptool.countDebris = function(debris) {
	var 
		res = 0,
		stuff = 0,
		harvs = {};

	debris.find('.res').each(function(){res += parseInt($(this).text());});

	debris.find('.tiny_eq').each(function(){ 
		var id, count; 
			id = $(this).find('img').attr('src').match(/\/(\d*)\./)[1]; 
			count = parseInt($(this).find('b').text()); 
			stuff += count * maptool.stuffWeight[id];
		});
	harvs.amount = stuff*100 + res;
	harvs.res = Math.ceil(res/2000);
	harvs.stuff = Math.ceil(stuff/20);
	harvs.last = harvs.amount%2000;
	harvs.exact = harvs.amount/2000;
	harvs.all = Math.ceil(harvs.exact);
	harvs.minus = (harvs.last > 3) ? Math.floor(harvs.exact) : Math.floor(harvs.exact) -1;

	if ('roundHarvs' in maptool.options 
		&& maptool.options.roundHarvs > -1 
		&& maptool.options.roundHarvs <= 20) 
	{
		harvs.exact = harvs.exact.toFixed(maptool.options.roundHarvs);
	};

	return harvs;

};
