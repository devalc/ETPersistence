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

  // var StamenTerrain = new ol.layer.Tile({
  //   source: new ol.source.XYZ({
  //     url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
  //     attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
  //   }),
  //   title: 'StamenTerrain'
  // })



  // vector layer- Water Districts
  // var dist = new ol.layer.Vector({
  //   title: 'Fields Layer read strraight from github',
  //   source: new ol.source.Vector({
  //     format: new ol.format.GeoJSON(),
  //     url: './data/Water_Districts.geojson'
  //   })

  // })

  // field boundary layer styling

  // const fillStyle= new ol.style.Fill({
  //   color: [84,118,225,1]

  // })

  // const strokeStyle= new ol.style.Stroke({
  //   color: [46,45,45,1],
  //   width: 10.2

  // })
  

  // Field boundary layer with all the calculated statistics

  // var persist_vec = new ol.layer.Tile({

  //   source: new ol.source.TileWMS({

  //     url: 'http://localhost:8080/geoserver/magicvalley/wms',
  //     params: {
  //       'layers': 'magicvalley:fields_all_stats_including_waterdist_and_irri_org'
  //     },
  //     serverType: 'geoserver'
  //   }),

  //   title: 'fields_all_stats_including_waterdist_and_irri_org',
    
  //   style: new ol.style.Style({
  //     fill: fillStyle,
  //     stroke: strokeStyle
  //     // image: circleStyle
  //   })

    
  // })


  // ET persistence raster layer

  var persist_ras = new ol.layer.Tile({
    title: 'persistence_new_RAT_lyr_magicValley_1986_2020_cog',
    source: new ol.source.TileWMS({

      url: 'http://dev.wepp.cloud:1337/geoserver/magicvalley/wms',
      params: {
        'layers': 'magicvalley:persistence_new_RAT_lyr_magicValley_1986_2020_cog'
      },
      serverType: 'geoserver'
    })
  })

  // var persist_ras_github = new ol.layer.Tile({
  //   title: 'Persistence Layer straight from github',
  //   source: new ol.source.TileWMS({

  //     url: 'https://github.com/devalc/ETPersistence/blob/77390f71fbd9790b0d943f719d4b0404d7536515/data/COG/persistence_new_RAT_lyr_magicValley_1986_2020_cog.tif'
  //   })
  // })

  // difference from the field average: raster

  var diff_ras = new ol.layer.Tile({
    title: 'difference_new_RAT_lyr_magicValley_1986_2020_cog',

    source: new ol.source.TileWMS({

      url: 'http://dev.wepp.cloud:1337/geoserver/magicvalley/wms',
      params: {
        'layers': 'magicvalley:difference_new_RAT_lyr_magicValley_1986_2020_cog'
      },
      serverType: 'geoserver',

    })
  })

  // difference more than 5% of the field average: raster 

  var diff_ras_5perc = new ol.layer.Tile({
    title: 'difference_from_field_avg_5perc',
    source: new ol.source.TileWMS({

      url: 'http://dev.wepp.cloud:1337/geoserver/magicvalley/wms',
      params: {
        'layers': 'magicvalley:difference_from_field_avg_5perc'
      },
      serverType: 'geoserver'
    })
  })



  // layer group

  var layersTodisplay = new ol.layer.Group({
    title: 'Overlays',
    layers: [persist_ras, diff_ras, diff_ras_5perc]
    // layers: [persist_vec, persist_ras, diff_ras, diff_ras_5perc]
  })

  var baselayersTodisplay = new ol.layer.Group({
    title: 'Base layers',
    layers: [osmbasemaplyr]
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
  map.addControl(layercontrols);

  // function genLegend() {
  //   var zero_layers = ol.overlays.getLayers().get('length');
  //   var head = document.createElement("h4");
  //   var txt = document.createTextNode("Legend")
  //   head.appendChild(txt);

  //   var elm = document.getElementById("legend");
  //   elm.appendChild(head);

  //   var ar = [];
  //   var i;
  //   for (i = 0; i < zero_layers; i++) {
  //     ar.push("http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=" + overlays.getLayers().item(i).get('title'));
  //   }

  //   for (i = 0; i < zero_layers; i++) {
  //     var head = document.createElement("p");

  //     var txt = document.createTextNode(overlays.getLayers(i).get('title'));

  //     head.appendChild(txt);

  //     var elm = document.getElementById("legend");
  //     elm.appendChild(head);
  //     var img = new Image();
  //     img.src = ar[i];

  //     var src = document.getElementById("legend");

  //     src.appendChild(img);


  //   }

  // }

  // genLegend();

}