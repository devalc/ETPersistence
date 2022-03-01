window.onload = intiMap;

function intiMap() {

  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM({ layer: 'terrain' })
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-114.0, 42.5]),
      zoom: 8
    })
  })

  // vector layer- Water Districts
  const dist = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: './data/Water_Districts.geojson'
    })
  })

  // Raster layer



  // add everything to base map layer

  map.addLayer(dist)

}

