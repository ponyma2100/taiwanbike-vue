import leaflet from "leaflet";



const renderMap = (data) => {
  data.map((station) => {
    setMarker(24.174652, 120.639231
      // station.StationPosition.PositionLon,
      // station.StationPosition.PositionLat
    );
  });
}


const setMarker = (positionLon = '', positionLat = '') => {
  console.log("🚀 ~ file: getMap.js ~ line 239 ~ setMarker ~ positionLat", positionLat)
  console.log("🚀 ~ file: getMap.js ~ line 239 ~ setMarker ~ positionLon", positionLon)
  let marker = leaflet.marker([positionLon, positionLat]).addTo(mymap);
  // mymap = leaflet.map("map").setView([positionLon, positionLat], 13);
  // let marker = leaflet.marker([positionLon, positionLat]).addTo(mymap);
  // leaflet.marker([positionLon, positionLat]).addTo(mymap)

  // mymap = leaflet.map("map").setView([25.03, 121.56], 13);
  // leaflet
  //   .tileLayer(
  //     "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  //     {
  //       attribution:
  //         'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //       maxZoom: 18,
  //       id: "mapbox/streets-v11",
  //       tileSize: 512,
  //       zoomOffset: -1,
  //       accessToken:
  //         "pk.eyJ1IjoicG9ueWF3ZXNvbWUiLCJhIjoiY2tscWd3djhwMHVwODJvcHM2dTJxcXByciJ9.EMsPVi7a-UV29InwyJ5m4g",
  //     }
  //   )
  //   .addTo(mymap);
  // let marker = leaflet.marker([positionLon, positionLat]).addTo(mymap);
  // let popup = leaflet.popup();

  // function onMapClick(e) {
  //   popup
  //     .setLatLng([positionLon, positionLat])
  //     .setContent("You clicked the map at " + e.latlng.toString())
  //     .openOn(mymap);
  // }

  // mymap.on("click", onMapClick);


}

const getMap = () => {
  return { stationData, renderMap, setMarker }
}

export default getMap

