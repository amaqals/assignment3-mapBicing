

// token
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxiYWxzaW5hIiwiYSI6ImNqdjgzcG02MDAzYXE0NG10bnppcWVubnUifQ.y-ojeFlaX7V1W3DG6eL0fA';


options = {
  container: 'mapContainer', // container ID, the div
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [2.17, 41.40], // [lng, lat]
  zoom: 12.5 // starting zoom level
}

// load the map
var map = new mapboxgl.Map(options);


// add control to mapbox
//var nav = new mapboxgl.NavigationControl();
//map.addControl(nav, 'top-left');


// now with the pizzashops
$.getJSON('./data/st_bicing_clean.json', function(stationRows){

  stationRows.forEach(function(station){

    // create a DOM element for the marker
    var icon = document.createElement('div');

    if (station.type === 'BIKE') {
      icon.className = 'marker1'
    }
    if (station.type === 'BIKE-ELECTRIC') {
      icon.className = 'marker2'
    }

    new mapboxgl.Marker(icon)
      .setLngLat([station.longitude, station.latitude])
      .setPopup(new mapboxgl.Popup()
      .setHTML('</p><p>' +'<p>Type: </p>' +'<p><b>'+`<p>${station.type}</p>`)) // insert variable
      .addTo(map)
  })
})

map.on('load', function(){
  map.addSource()
})

/*
map.addLayer({

})*/
