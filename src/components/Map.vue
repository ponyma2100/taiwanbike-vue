<template>
  <div id="map"></div>
  <BikeInfo
    :stationInfo="stationInfo"
    v-show="showCard"
    @closeCard="toggleClose"
  />
</template>

<script>
import L from "leaflet";
import markerClusterGroup from "leaflet.markercluster";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import getBike from ".././composables/getBike";
import BikeInfo from ".././components/BikeInfo.vue";

import { onMounted, ref, watch } from "@vue/runtime-core";

export default {
  components: { BikeInfo },
  props: ["selectedCity"],
  setup(props) {
    const { getStation, station, getAvailableBike, availableBike } = getBike();
    const showCard = ref(false);
    let mymap = {};
    let markers = L.markerClusterGroup();

    onMounted(async () => {
      await getAvailableBike(props.selectedCity);
      await getStation(props.selectedCity);

      mymap = L.map("map").setView(
        [
          station.value[0].StationPosition.PositionLat,
          station.value[0].StationPosition.PositionLon,
        ],
        15
      );

      L.tileLayer(
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
      ).addTo(mymap);

      renderMap(station.value);
    });

    watch(
      () => props.selectedCity,
      async (newValue, oldValue) => {
        // get data
        await getAvailableBike(props.selectedCity);
        await getStation(props.selectedCity);
        renderMap(station.value);
        // reset setView
        mymap.setView(
          [
            station.value[0].StationPosition.PositionLat,
            station.value[0].StationPosition.PositionLon,
          ],
          15
        );
      }
    );

    const renderMap = (data) => {
      // remove layer
      markers.clearLayers();
      // add layer

      data.map((item) => {
        markers.addLayer(
          L.marker([
            item.StationPosition.PositionLat,
            item.StationPosition.PositionLon,
          ]).on("click", () => {
            getBikeInfo(item);
          })
        );

        mymap.addLayer(markers);
      });
    };

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
#map {
  height: 90vh;
  z-index: 10;
}
</style>