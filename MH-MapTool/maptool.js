var maptool = maptool || {};

maptool.options = maptool.options || {
		'gridLines' : true,
		'portals' : true, // @todo: default to false 
		'scanDebris' : true, // @todo: default to false 
		'scanNPC' : true, // @todo: default to false 
		'scanDelayTime' : 220,
		'keepDebrisTime' : 1000 * 60 * 60 * 48, // 48 hours
		'rescanDebrisTime' : 1000 * 60 * 1, // 1 minute
		'useDefault' : 'localDefault'
	};

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


maptool.addLines = function(k) {

	if (!maptool.options.gridLines) { return ''; };

	var
		lineclass = '',
		portals = maptool.portals,
		p = maptool.options.portals, 
		x = _mapX(k), // (k%512)-256, 
		y = _mapY(k) - 1; // 255-Math.floor(k/512)

    if ((x%8) == 0) {
        lineclass += ' north';
        if (p && portals[x] && portals[portals[x]][y]) {
			lineclass += '-portal';
		};
    };

    if ((y%8) == 0) {
        lineclass += ' west';
        if (p && portals[y] && portals[portals[y]][x]) {
			lineclass += '-portal';
		};
    };
    
    return lineclass;
};

maptool.render = function (k,e,m) {
    var 
        maptext = '',
        mtextclass = '',
        lineclass = maptool.addLines(k),
        storedId = 'map'+k,
		cel = m.text.match(/_cell.gif'\/> (\d)/),
		atm = m.text.match(/_antimatter.png'\/>(\d)/),
        isDebris = m.text.indexOf(_debrisField) !== -1,
        showDebris = maptool.options.scanDebris,
        s_debris = localStorage.getItem(storedId);
    if (s_debris) {
		var old = (Date.now() - s_debris.time) > maptool.options.keepDebrisTime;
		if (!isDebris || old) { 
			localStorage.removeItem(storedId);
			
		} else if (showDebris && !m.scanned) {
			m.debris = JSON.parse(s_debris);
		};
    };
    
    if (m.npc) {
		mtextclass += ' npcvalue';
		maptext = m.npc;

    } else if (showDebris && isDebris && m.debris && m.debris.all) {
		mtextclass += ' debriscount';
		if (m.debris.stored && !m.scanned) { mtextclass += ' stored'; };
		maptext = '<p class="debris_item">'+ m.debris.topItem +'</p><p>' + m.debris.all + '</p>';
    } else if (atm && atm[1] != 0) {
        mtextclass += ' atmcount';
        mtextclass += ' restextsize-' + atm[1];
        maptext = atm[1];

    } else if (cel && cel[1] != 4) {
        mtextclass += ' cellcount';
        mtextclass += ' restextsize-' + cel[1];
        maptext = cel[1];
    };
    
    
    e.innerHTML = '<div class="maptool"><div class="panellines' + lineclass +'"></div><div class="maptext' + mtextclass + '">' + maptext + '</div></div>';

};

maptool.inject = String(window.refresh).replace(/(\w+)=_mapID\(planetID(?:.*)(\w+)\.style\.backgroundPosition(?:.*)\[(\w+)(?:[^;]*);/, "$& maptool.render($1,$2,$3); ").replace(/(\w+)\.style\.backgroundPosition="0 0";/, "$& $1.innerHTML = '';");

maptool.scan = function (c, b) {
	var a = _mapX(mapID) + c,
		i = _mapY(mapID) + b;
	if (!isValid(a, i)) {
		return
	}
	var h = _mapID(planetID, a, i),
		f = map[h],
		link = "Navigation.aspx?mid=" + h,
		timeout = null,
		e = event.target,
		debrisdiplay = $("#debrisdiplay");
	
	debrisdiplay.empty();
		
	if (f.text.match(_debrisField)) {
		if (f.debris && (f.scanned || ((f.debris.time + maptool.options.rescanDebrisTime) > Date.now()))) {
			debrisdiplay.html(f.debris.details);
		} else {
			timeout = setTimeout(function() {
				$.get(link, function(result){
					var debris = $(result).find('#navigationControl .panel.left .scroll_y');
				
					if (debris.length) { 
						var harvs = countDebris(debris),
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
						debrisdiplay.html(radarout);
					};
				});
			}, maptool.options.scanDelayTime);
		}
	};
	
	if (f.text.match(_npc)){
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

maptool.inject += "pos = (function(c, b) {var o_pos = pos; return function (c, b) {o_pos(c, b); maptool.scan(c, b)};})();";

maptool.s = document.createElement('script');
maptool.s.setAttribute('type', 'text/javascript');
maptool.s.innerHTML = maptool.inject + '; refresh();';
document.head.appendChild(maptool.s);
