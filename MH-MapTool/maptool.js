var portalcoords = {
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

function maptool(k,e,m) {
    var cel, atm, kx, ky,
        lineclass = '',
        mtextclass = '',
        maptext = '';

    cel = m.text.match(/_cell.gif'\/> (\d)/);
    atm = m.text.match(/_antimatter.png'\/>(\d)/);

    kx = -256+(k%512);
    ky = 255-Math.floor(k/512);
    
    if ((kx%8) == 0) {
        lineclass += ' north';
        if (portalcoords[kx] && portalcoords[portalcoords[kx]][ky]) {
			lineclass += '-portal';
		}
    }
    if ((ky%8) == 0) {
        lineclass += ' west';
        if (portalcoords[ky] && portalcoords[portalcoords[ky]][kx]) {
			lineclass += '-portal';
		}
    }
    
    if (m.debris && m.debris.all) {
		mtextclass += ' debriscount';
		maptext = '<p class="debris_item">'+ m.debris.topItem +'</p><p>' + m.debris.all + '</p>';
    
    } else if (atm && atm[1] != 0) {
        mtextclass += ' atmcount';
        mtextclass += ' restextsize-' + atm[1];
        maptext = atm[1];
    
    } else if (cel && cel[1] != 4) {
        mtextclass += ' cellcount';
        mtextclass += ' restextsize-' + cel[1];
        maptext = cel[1];
    }
    
    
    e.innerHTML = '<div class="maptool"><div class="panellines' + lineclass +'"></div><div class="maptext' + mtextclass + '">' + maptext + '</div></div>';

}

var codeInject = String(window.refresh).replace(/(\w+)=_mapID\(planetID(?:.*)(\w+)\.style\.backgroundPosition(?:.*)\[(\w+)(?:[^;]*);/, "$& maptool($1,$2,$3); ").replace(/(\w+)\.style\.backgroundPosition="0 0";/, "$& $1.innerHTML = '';");

function dispalyDebris (c, b) {
	var a = _mapX(mapID) + c,
		i = _mapY(mapID) + b;
	if (!isValid(a, i)) {
		return
	}
	var h = _mapID(planetID, a, i),
		f = map[h],
		link = "Navigation.aspx?mid=" + h + " .panel.left .scroll_y",
//		link = "Navigation.aspx?mid=" + h + " .panel.left",
		timeout = null,
		e = event.target;
	  
	var timeout = setTimeout(function() {
		var debrisdiplay = $("#debrisdiplay");
		if (f.text.match(_debrisField)) {
			if (f.debris) {
				debrisdiplay.html(f.debris.details);
			} else {
				debrisdiplay.load(link, function(){
					var debris = $(this).find('.scroll_y'),
						harvs = countDebris(debris),
						items = debris.find('.tiny_eq img');
					
					debris.removeAttr("style");
					debris.before('<div class="maptool_h">'+ (harvs.stuff ? harvs.stuff + ' / ' : '') + harvs.all +'</div>');
					debris.after('<p>harvester loads = <b>'+ harvs.exact +' </b></p>');
					
					harvs.topItem = items.length ? items[0].outerHTML : '';
					harvs.details = this.innerHTML;

					f.debris = harvs;
					refresh();
				});
			}
		} else {
			debrisdiplay.empty();
		}
		
	}, 200);
	  
	e.onmouseout = function() {
		clearTimeout(timeout);
	} 
};

codeInject = codeInject + "pos = (function(c, b) {var o_pos = pos; return function (c, b) {o_pos(c, b); dispalyDebris(c, b)};})();";

var s = document.createElement('script');
s.setAttribute('type', 'text/javascript');
s.innerHTML = codeInject + '; refresh();';
document.head.appendChild(s);
