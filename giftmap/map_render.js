var long = localStorage.getItem('longitude') ?  parseFloat(localStorage.getItem('longitude')) : 37.619;
var lat = localStorage.getItem('latitude') ?  parseFloat(localStorage.getItem('latitude')) : 55.751;
var mapLang = localStorage.getItem('language') ?  localStorage.getItem('language') : 'ru';
var mapClock = localStorage.getItem('dateAndTime') ? localStorage.getItem('dateAndTime') : new Date();
var mapText = localStorage.getItem('mapText') ? localStorage.getItem('mapText') : '';
var place = localStorage.getItem('place') ? localStorage.getItem('place') : '';
var date = localStorage.getItem('date') ? localStorage.getItem('date') : '';
var planetarium;
console.log(mapLang);

S(document).ready(function() {

	planetarium = S.virtualsky({
		id: 'starmap',				
        lang: mapLang, 					
        negative: false,			
		projections: 'polar',		
		constellations: true,		
		constellationwidth: 2,		
		magnitude: 5,				
		keyboard: false,			
		mouse: false,				
		scalestars: 4,				
		constellationlabels: true,	
		showstarlabels: false,		
		longitude: long,			
		latitude: lat,				
		fontsize: '36px',			
		fontfamily: 'Montserrat',
		showplanets: false,			
		cardinalpoints: false,		
		credit: false,				
		showdate: false,			
		showposition: false,
        clock: new Date(mapClock)/*,		
		color: 'rgb(255,0,0)'*/
	});
    planetarium.colours.normal.cardinal = 'rgba(255,0,0,1)'; // Стороны горизонта
	planetarium.colours.normal.constellation = "rgba(251, 255, 178, 1)"; //Линии созвездий 180,180,255,1
	planetarium.colours.normal.txt = "rgba(250,0,0,1)";
	planetarium.updateColours();

    document.querySelector('.textWrap').innerHTML = mapText;
    document.querySelector('.place').innerHTML = place;
    document.querySelector('.dateAndTime').innerHTML = date;

});
