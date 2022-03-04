window.onload = initMap;

function initMap() {

  var map = new ol.Map({
    target: 'map',
    view: new ol.View({
      center: ol.proj.fromLonLat([-114.0, 42.5]),
      zoom: 15,
      maxZoom: 15,
      minZoom: 8
    })
  })

  // base map layers
  // osm
  var osmbasemaplyr = new ol.layer.Tile({
    source: new ol.source.OSM({}),
    title: 'OpenStreet Baselayer'
  })

  // stamen 

  var StamenTerrain = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
      attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    title: 'StamenTerrain'
  })



  // vector layer- Water Districts
  // var dist = new ol.layer.Vector({
  //   title: 'Water Districts',
  //   source: new ol.source.Vector({
  //     format: new ol.format.GeoJSON(),
  //     url: './data/Water_Districts.geojson'
  //   })

  // })


  // Field boundaruy layer with all the calculated statistics

  var persist_vec = new ol.layer.Tile({

    title: 'Field Boundries',

    source: new ol.source.TileWMS({

      url: 'http://localhost:8080/geoserver/magicvalley/wms',
      params: { 'layers': 'magicvalley:fields_all_stats_including_waterdist_and_irri_org' },
      serverType: 'geoserver'
    })
  })


  // ET persistence raster layer

  var persist_ras = new ol.layer.Tile({
    title: 'Persistence Layer',
    source: new ol.source.TileWMS({

      url: 'http://localhost:8080/geoserver/magicvalley/wms',
      params: { 'layers': 'magicvalley:persistence_new_RAT_lyr_magicValley_1986_2020_cog' },
      serverType: 'geoserver'
    })
  })

  // difference greater than 5% of the field average: raster

  var diff_ras = new ol.layer.Tile({
    title: 'Difference from Field Average',

    source: new ol.source.TileWMS({

      url: 'http://localhost:8080/geoserver/magicvalley/wms',
      params: { 'layers': 'magicvalley:difference_from_field_average' },
      serverType: 'geoserver',

    })
  })

  // difference more than 5% of the field average: raster 

  var diff_ras_5perc = new ol.layer.Tile({
    title: 'Difference more than at lease 5% of field average',
    source: new ol.source.TileWMS({

      url: 'http://localhost:8080/geoserver/magicvalley/wms',
      params: { 'layers': 'magicvalley:difference_from_field_avg_5perc' },
      serverType: 'geoserver'
    })
  })



  // layer group

  var layersTodisplay = new ol.layer.Group({
    title: 'Overlays',
    layers: [persist_vec, persist_ras, diff_ras, diff_ras_5perc]
  })

  var baselayersTodisplay = new ol.layer.Group({
    title: 'Base layers',
    layers: [osmbasemaplyr, StamenTerrain]
  })

  // add everything to base map layer

  map.addLayer(baselayersTodisplay)
  map.addLayer(layersTodisplay)

  // layer switcher

  var layercontrols = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: true,
    groupSelectStyle: 'children'
  });

  // add Layer controls
  map.addControl(layercontrols)

}
