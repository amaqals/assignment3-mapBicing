

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


// add point-layer and markers+popup
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

// add polygon layer: bike lanes
// https://opendata-ajuntament.barcelona.cat/data/en/dataset/carril-bici
map.on('load', function () {
        map.addSource('maine', {
            'type': 'geojson',
            'data': './data/CARRIL_BICI.geojson'
        });
        map.addLayer({
            'id': 'maine',
            'type': 'line',
            'source': 'maine',
            'layout': {},
            'paint': {
                'line-color': '#088',
                'line-width': 3
            }
        });
    });

// add polygon layer: cycle paths (circulation speed== 10, 20 or 30 km/h)
// https://opendata-ajuntament.barcelona.cat/data/en/dataset/vies-ciclables
map.on('load', function () {
        map.addSource('lanes_p', {
            'type': 'geojson',
            'data': './data/VIES_CICLABLES.geojson'
        });
        map.addLayer({
            'id': 'lanes_p',
            'type': 'line',
            'source': 'lanes_p',
            'layout': {},
            'paint': {
                'line-color': '#f5da42',
                'line-width': 1
            }
        });
    });
