var long = localStorage.getItem('longitude') ?  parseFloat(localStorage.getItem('longitude')) : 37.619;
var lat = localStorage.getItem('latitude') ?  parseFloat(localStorage.getItem('latitude')) : 55.751;
var planetarium;


// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
    // Создание карты.
    var myMap = new ymaps.Map("geoMap", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [lat, long],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 6
    });
    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('rulerControl');
    myMap.events.add('click', function (e) {
        // Получение координат щелчка
        var coords = e.get('coords');
        long = coords[1].toFixed(3);
        lat = coords[0].toFixed(3);
        localStorage.setItem('longitude', long);
        localStorage.setItem('latitude', lat);
        var pos = lat+', '+long;
        planetarium.setGeo(pos);
		planetarium.setClock(0).draw();
    }); 
}
       



S(document).ready(function() {

	planetarium = S.virtualsky({
		id: 'starmap',				// ID блока в документе, в который выводится карта
        lang:'ru', 					// язык
        negative: false,			// негатив
		projections: 'polar',		// тип проекции
		constellations: true,		// отображение линий созвездий
		constellationwidth: 1,		// ширина линий созвездий в пикселях
		magnitude: 5,				// минимальная отображаемая звёздная величина
		keyboard: false,			// управление клавиатурой
		mouse: false,				// управление мышью
		scalestars: 2,				// размер звёзд
		constellationlabels: true,	// названия созвездий
		showstarlabels: false,		// названия звёзд
		longitude: long,			// долгота местности
		latitude: lat,				// широта местности
		fontsize: '10px',			
		fontfamily: 'Montserrat',
		showplanets: false,			// показывать планеты
		cardinalpoints: false,		// показывать стороны света
		credit: false,				// копирайт
		showdate: false,			// показывать дату
		showposition: false/*,		// отображать местоположение
		color: 'rgb(255,0,0)'*/
	});
    planetarium.colours.normal.cardinal = 'rgba(255,0,0,1)'; // Стороны горизонта
	planetarium.colours.normal.constellation = "rgba(251, 255, 178, 1)"; //Линии созвездий по умолчанию 180,180,255,1
	planetarium.colours.normal.txt = "rgba(250,0,0,1)";
	planetarium.updateColours();

    S('#mapDate').on('change', setDateAndTime);
    S('#mapTime').on('change', setDateAndTime);
    S('#language').on('change',function(){
		var value = document.querySelector('#language').value;
        localStorage.setItem('language', value);
		planetarium.langcode = value;
		planetarium.loadLanguage(value);
		planetarium.changeLanguage(value);
		planetarium.drawImmediate();
    });
    S('#mapText').on('input',function(){
        var value = document.querySelector('#mapText').value;
        localStorage.setItem('mapText', value);
        document.querySelector('.textWrap').innerHTML = value;
    });
    S('#showPlace').on('input',function(){
        var value = document.querySelector('#showPlace').value;
        localStorage.setItem('place', value);
        document.querySelector('.place').innerHTML = value;
    });
    S('#showDate').on('change',function(){
        if (document.querySelector('#showDate').checked){
            //var date = document.querySelector('#mapDate').value.replace( /-/g, "." );
            var date = document.querySelector('#mapDate').value.split('-').reverse().join('.');
            document.querySelector('.dateAndTime').innerHTML = date;
            localStorage.setItem('date', date);
        }
        else {
            document.querySelector('.dateAndTime').innerHTML = '';
            localStorage.removeItem('date');
        }
    });
});

function setDateAndTime(){
    var value = document.querySelector('#mapDate').value+'T'+document.querySelector('#mapTime').value;
    planetarium.setClock(value);
    localStorage.setItem('dateAndTime', value)
}
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

Date.prototype.toTimeInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(11,16);
});

function setDefault(){
    localStorage.clear();
    document.querySelector('#mapDate').value = new Date().toDateInputValue();
    document.querySelector('#mapTime').value = new Date().toTimeInputValue();
}

window.onload = setDefault();

