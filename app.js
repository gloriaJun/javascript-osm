'use strict';

const zoom = {
  level: 15,
  maxLevel: 19,
}

function getLocation() {
  return new Promise(resolve => {
    navigator.geolocation.watchPosition(function(position) {
      return resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  });
}

// Leaf Map 로딩
function loadLeafMap(location = [], zoomLevel = 7, zoomMaxLevel = 18) {
  // 위도, 경도, zoom level 설정
  const map = L.map('leafMap').setView(location, zoomLevel);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: zoomMaxLevel,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // set marker
}

// openlayers 로딩
function loadOpenLayers(location = [], zoomLevel = 7) {
  new ol.Map({
    target: 'openLayerMap',
    view: new ol.View({
      center: ol.proj.fromLonLat(location),
      zoom: zoomLevel,
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
  });
}


getLocation().then(location => {
  const { latitude, longitude }= location;
  console.log(latitude, longitude);

  loadLeafMap([latitude, longitude], zoom.level, zoom.maxLevel);
  loadOpenLayers([longitude, latitude], zoom.level);
});
