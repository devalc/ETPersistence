window.onload = intiMap;

function intiMap(){
var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM({layer: 'terrain'})
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-114.0, 42.5]),
      zoom: 10
    })
  })
}