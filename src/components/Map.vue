<template>
  <BikeInfo
    :stationInfo="stationInfo"
    v-show="showCard"
    @closeCard="toggleClose"
  />
</template>

<script>
import leaflet from "leaflet";
import getMap from ".././composables/getMap";
import getBike from ".././composables/getBike";
import BikeInfo from ".././components/BikeInfo.vue";

import { onMounted, onUpdated, ref } from "@vue/runtime-core";
import markerClusterGroup from "leaflet.markercluster";
// import "leaflet.markercluster/dist/leaflet.markercluster";
// import "leaflet.markercluster/dist/MarkerCluster.css";
// import "leaflet.markercluster/dist/MarkerCluster.Default.css";

export default {
  components: { BikeInfo },
  props: ["selectedCity"],
  setup(props) {
    console.log(
      "🚀 ~ file: Map.vue ~ line 25 ~ setup ~ props",
      props.selectedCity
    );
    const { getStation, station, getAvailableBike, availableBike } = getBike();
    const showCard = ref(false);
    onMounted(async () => {
      await getAvailableBike("Taipei");
      await getStation("Taipei");

      let mymap;
      let markers = leaflet.markerClusterGroup();

      mymap = leaflet.map("map").setView([25.03, 121.56], 13);
      leaflet
        .tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
              "pk.eyJ1IjoicG9ueWF3ZXNvbWUiLCJhIjoiY2tscWd3djhwMHVwODJvcHM2dTJxcXByciJ9.EMsPVi7a-UV29InwyJ5m4g",
          }
        )
        .addTo(mymap);
      let marker = leaflet.marker([25.03, 121.56]).addTo(mymap);
      let popup = leaflet.popup();
      marker.openPopup();
      const renderMap = () => {
        station.value.map((item) => {
          markers.addLayer(
            leaflet
              .marker([
                item.StationPosition.PositionLat,
                item.StationPosition.PositionLon,
              ])
              .on("click", () => {
                console.log("item.StationID", item.StationID);
                getBikeInfo(item);
              })
          );
          mymap.addLayer(markers);
        });
      };
      renderMap();
    });

    const stationInfo = ref({});

    const getBikeInfo = (data) => {
      // 0:'停止營運',1:'正常營運',2:'暫停營運']
      showCard.value = true;

      availableBike.value.map((item) => {
        if (data.StationID === item.StationID) {
          stationInfo.value = {
            address: data.StationAddress.Zh_tw,
            name: data.StationName.Zh_tw,
            time: item.UpdateTime,
            availableBikes: item.AvailableRentBikes,
            returnBikes: item.AvailableReturnBikes,
            status: item.ServiceStatus,
          };
          if (stationInfo.value.status === 0) {
            stationInfo.value.status = "停止營運";
          } else if (stationInfo.value.status === 1) {
            stationInfo.value.status = "正常營運";
          } else {
            stationInfo.value.status = "暫停營運";
          }
        }
      });

      return { stationInfo };
    };

    const toggleClose = () => {
      showCard.value = false;
    };

    return { station, availableBike, stationInfo, showCard, toggleClose };
  },
};
</script>

<style>
</style>