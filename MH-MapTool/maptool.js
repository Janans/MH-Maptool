var mt_cells = false;
var mt_antimatter = false;
var mt_resources = false;
var mt_borders = true;

function maptool(k,e,m) {
    var cry, gas, cel, atm, kx, ky,
        lineclass = '',
        mtextclass = '',
        maptext = '';

    cry = m.text.match(/_crystal.gif'\/> (\d)/);
    gas = m.text.match(/_gas.gif'\/> (\d)/);
    cel = m.text.match(/_cell.gif'\/> (\d)/);
    atm = m.text.match(/_antimatter.png'\/> (\d)/);
    kx = -256+(k%512);
    ky = 256-Math.floor(k/512);
    
    if ((kx%8) == 0) {
        lineclass += ' north';
    }
    if (((ky-1)%8) == 0) {
        lineclass += ' west';
    }
    
    
    mt_cells = true;
    if (cel && mt_cells && cel[1] != 4 ) {
        mtextclass += ' cellcount';
        mtextclass += ' restextsize-' + cel[1];
        maptext = cel[1];
    }
    
    
    if (window.map[k] !== undefined) {
        e.innerHTML = '<div class="maptool"><div class="panellines' + lineclass +'"></div><div class="maptext' + mtextclass + '">' + maptext + '</div></div>';
    } else {
        e.innerHTML = '';
    }
}

codeInject = String(window.refresh).replace(/(\w+)=_mapID\(planetID(?:.*)(\w+)\.style\.backgroundPosition(?:.*)\[(\w+)(?:[^;]*);/, "$& maptool($1,$2,$3); ");

var s = document.createElement('script');
s.setAttribute('type', 'text/javascript');
s.innerHTML = codeInject + ' refresh();';
(document.head||document.documentElement).appendChild(s);





