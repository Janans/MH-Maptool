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
    
    
    if (atm && atm[1] != 0) {
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

codeInject = String(window.refresh).replace(/(\w+)=_mapID\(planetID(?:.*)(\w+)\.style\.backgroundPosition(?:.*)\[(\w+)(?:[^;]*);/, "$& maptool($1,$2,$3); ").replace(/(\w+)\.style\.backgroundPosition="0 0";/, "$& $1.innerHTML = '';");

var s = document.createElement('script');
s.setAttribute('type', 'text/javascript');
s.innerHTML = codeInject + '; refresh();';
document.head.appendChild(s);