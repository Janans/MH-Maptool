function maptool(k,e,m) {
    var cel, atm, kx, ky,
        lineclass = '',
        mtextclass = '',
        maptext = '';

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
    
    
    if (atm && atm[0] != 0) {
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

codeInject = String(window.refresh).replace(/(\w+)=_mapID\(planetID(?:.*)(\w+)\.style\.backgroundPosition(?:.*)\[(\w+)(?:[^;]*);/, "$& maptool($1,$2,$3); ");

var s = document.createElement('script');
s.setAttribute('type', 'text/javascript');
s.innerHTML = codeInject + ' refresh();';
(document.head||document.documentElement).appendChild(s);





