var maptool = maptool || {};

maptool.options = maptool.options || {
		// fallback defaults 
		'gridLines' : true,
		'portals' : true, // globally default to false 
		'fieldValue' : true,
		'city' : 'none',
		'scanDebris' : true, // globally default to false 
		'scanNpc' : true, // globally default to false 
		'scanDelayTime' : 220, // microseconds
		'keepDebrisTime' : 3000, // 6 hours, in minutes
		'rescanDebrisTime' : 1, // 1 minute
		'countHarvest' : true,
		'roundHarvs' : 3,
		'useDefault' : 'mapLocalDefault'
	};

// expand minutes to microseconds
maptool.options.keepDebrisTime = parseInt(maptool.options.keepDebrisTime) * 60 * 1000;
maptool.options.rescanDebrisTime = parseInt(maptool.options.rescanDebrisTime) * 60 * 1000;

// force count harvs if scanDebris true
maptool.options.countHarvest = maptool.scanDebris ? true : maptool.options.countHarvest;

maptool.portals = {
	shortrow : {
		'-86' : true,
		'-87' : true,
		'-86' : true,
		'-85' : true,
		'-84' : true,
		'-83' : true,
		'-82' : true,
		'-81' : true,

		'-32' : true,
		'-31' : true,
		'-30' : true,
		'-29' : true,
		'-28' : true,
		'-27' : true,
		'-26' : true,
		'-25' : true,

		'24' : true,
		'25' : true,
		'26' : true,
		'27' : true,
		'28' : true,
		'29' : true,
		'30' : true,
		'31' : true,

		'80' : true,
		'81' : true,
		'82' : true,
		'83' : true,
		'84' : true,
		'85' : true,
		'86' : true,
		'87' : true
		},
	longrow : {
		'-144' : true,
		'-143' : true,
		'-142' : true,
		'-141' : true,
		'-140' : true,
		'-139' : true,
		'-138' : true,
		'-137' : true,

		'-88' : true,
		'-87' : true,
		'-86' : true,
		'-85' : true,
		'-84' : true,
		'-83' : true,
		'-82' : true,
		'-81' : true,

		'-32' : true,
		'-31' : true,
		'-30' : true,
		'-29' : true,
		'-28' : true,
		'-27' : true,
		'-26' : true,
		'-25' : true,

		'24' : true,
		'25' : true,
		'26' : true,
		'27' : true,
		'28' : true,
		'29' : true,
		'30' : true,
		'31' : true,

		'80' : true,
		'81' : true,
		'82' : true,
		'83' : true,
		'84' : true,
		'85' : true,
		'86' : true,
		'87' : true,

		'136' : true,
		'137' : true,
		'138' : true,
		'139' : true,
		'140' : true,
		'141' : true,
		'142' : true,
		'143' : true
		},

	'-144' : 'shortrow',
	'-136' : 'shortrow',
	'-88' : 'longrow',
	'-80' : 'longrow',
	'-32' : 'longrow',
	'-24' : 'longrow',
	'24' : 'longrow',
	'32' : 'longrow',
	'80' : 'longrow',
	'88' : 'longrow',
	'136' : 'shortrow',
	'144' : 'shortrow'
	};

maptool.addLines = (function() {
	
	if (maptool.options.gridLines && maptool.options.portals) {

		return function(k) {
			var
				lineclass = '',
				portals = maptool.portals,
				x = _mapX(k), // (k%512)-256, 
				y = _mapY(k) - 1; // 255-Math.floor(k/512)

			if ((x%8) == 0) {
				lineclass += ' north';
				if (portals[x] && portals[portals[x]][y]) {
					lineclass += '-portal';
				};
			};

			if ((y%8) == 0) {
				lineclass += ' west';
				if (portals[y] && portals[portals[y]][x]) {
					lineclass += '-portal';
				};
			};
			return lineclass;
		};
	
	} else if (maptool.options.gridLines) {
	
		return function(k) {
			var
				lineclass = '',
				x = _mapX(k), // (k%512)-256, 
				y = _mapY(k) - 1; // 255-Math.floor(k/512)

			if ((x%8) == 0) {
				lineclass += ' north';
			};

			if ((y%8) == 0) {
				lineclass += ' west';
			};
			return lineclass;
		};
	};

	return function() {};
	
})();

maptool.cityText = function(m) {
	var key = window[maptool.options.city] + '\\s<b>(.+?)<\\/b>',
		result = m.text.match(key);
	return result ? result[1] : '';
};

maptool.render = function (k,e,m) {
    var 
        maptext = '',
        mtextclass = '',
        lineclass = maptool.addLines(k),
        storedId = 'map'+k,
		cel = m.text.match(/_cell.gif'\/> (\d)/),
		atm = m.text.match(/_antimatter.png'\/>(\d)/),
        isDebris = m.mapclass == 10,
        showCity = m.mapclass == 1 && maptool.options.city !=="none";
        showDebris = maptool.options.scanDebris,
        showValue = maptool.options.fieldValue,
        s_debris = JSON.parse(localStorage.getItem(storedId));
        
    if (s_debris) {
		var old = (s_debris.time + maptool.options.keepDebrisTime) < Date.now();
		if (!isDebris || old) { 
			localStorage.removeItem(storedId);
			
		} else if (showDebris && !m.scanned) {
			m.debris = s_debris;

		};
    };
    
    if (m.npc) {
		mtextclass += ' npcvalue';
		maptext = m.npc;
		
	} else if (showCity) {
		mtextclass += ' citytext';
		maptext = maptool.cityText(m);

    } else if (showDebris && isDebris && m.debris && m.debris.all) {
		mtextclass += ' debriscount';
		if (m.debris.stored && !m.scanned) { mtextclass += ' stored'; };
		maptext = '<p class="debris_item">'+ m.debris.topItem +'</p><p>' + m.debris.all + '</p>';
		
    } else if (showValue && atm && atm[1] != 0) {
        mtextclass += ' atmcount';
        mtextclass += ' restextsize-' + atm[1];
        maptext = atm[1];

    } else if (showValue && cel && cel[1] != 4) {
        mtextclass += ' cellcount';
        mtextclass += ' restextsize-' + cel[1];
        maptext = cel[1];
    };
    
    
    e.innerHTML = '<div class="maptool"><div class="panellines' + lineclass +'"></div><div class="maptext' + mtextclass + '">' + maptext + '</div></div>';

};

maptool.scan = function (c, b) {
	var a = _mapX(mapID) + c,
		i = _mapY(mapID) + b;
	if (!isValid(a, i)) {
		return;
	}
	var h = _mapID(planetID, a, i),
		f = map[h],
		link = "Navigation.aspx?mid=" + h,
		timeout = null,
		e = event.target,
		debrisdiplay = $("#debrisdiplay");
	
	debrisdiplay.empty();
		
	if (maptool.options.scanDebris && f.mapclass == 10) {
		if ('debris' in f
				&& ((f.scanned || ((f.debris.time + maptool.options.rescanDebrisTime) > Date.now()))
				|| 'radarout' in f.debris)) {
				
			if ('details' in f.debris) {
				debrisdiplay.html(f.debris.details);
			} else if ('radarout' in f.debris){
				debrisdiplay.html(f.debris.radarout);
			}
		} else {
			timeout = setTimeout(function() {
				$.get(link, function(result){
					var debris = $(result).find('#navigationControl .panel.left .scroll_y');
				
					if (debris.length) { 
						var harvs = maptool.countDebris(debris),
							items = debris.find('.tiny_eq img'),
							storedId = 'map'+h;

						debris.removeAttr("style");
						debrisdiplay.html(debris);
						debris.before('<div class="maptool_h">'+ (harvs.stuff ? harvs.stuff + ' / ' : '') + harvs.all +'</div>');
						debris.after('<p>harvester loads = <b>'+ harvs.exact +' </b></p>');
						
						harvs.topItem = items.length ? items[0].outerHTML : '';
						harvs.details = debrisdiplay.html();

						f.debris = harvs;
						f.debris.stored = false;
						f.scanned = true;
						
						harvs.time = Date.now();
						harvs.stored = true;
						localStorage.setItem(storedId, JSON.stringify(harvs));
						
						refresh();
						
					} else {
						var radarout = $(result).find('#navigationControl .panel.left p.yellow');
						if (radarout.length) {
							if ('debris' in f && 'details' in f.debris) {
								debrisdiplay.html(f.debris.details);
							} else {
								debrisdiplay.html(radarout);
								f.debris.radarout = debrisdiplay.html();
							};
						};
					};
				});
			}, maptool.options.scanDelayTime);
		};
	};
	
	if (maptool.options.scanNpc && f.text.match(_npc)){
		timeout = setTimeout(function() {
			$.get(link, function(result){
				f.npc = $(result).find('#navigationControl .panel.left p b:nth-child(2)').text();
				refresh();
			});
		},  maptool.options.scanDelayTime);
	};
	
	e.onmouseout = function() {
		clearTimeout(timeout);
	};
};

maptool.clearDebrisStorage = function() {
	Object.keys(localStorage)
		  .forEach(function(key){
			   if (/^map\d+/.test(key)) {
				   localStorage.removeItem(key);
			   }
		   });
};


maptool.inject = String(window.refresh).replace(/(\w+)=_mapID\(planetID(?:.*)(\w+)\.style\.backgroundPosition(?:.*)\[(\w+)(?:[^;]*);/, "$& maptool.render($1,$2,$3); ").replace(/(\w+)\.style\.backgroundPosition="0 0";/, "$& $1.innerHTML = '';");

maptool.inject += "pos = (function(c, b) {var o_pos = pos; return function (c, b) {o_pos(c, b); maptool.scan(c, b)};})();";

maptool.s = document.createElement('script');
maptool.s.setAttribute('type', 'text/javascript');
maptool.s.innerHTML = maptool.inject + '; refresh();';
document.head.appendChild(maptool.s);
