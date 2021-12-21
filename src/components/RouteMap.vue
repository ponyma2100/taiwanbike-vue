<template>
  <div id="map"></div>
</template>

<script>
import L from "leaflet";
import markerClusterGroup from "leaflet.markercluster";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import getBike from ".././composables/getBike";
import { onMounted } from "@vue/runtime-core";

export default {
  props: ["selectedCity"],
  setup(props) {
    const { getBikeShape, bikeShape } = getBike();
    getBikeShape(props.selectedCity);

    let mymap = {};
    // let markers = L.markerClusterGroup();

    onMounted(async () => {
      await getBikeShape(props.selectedCity);

      mymap = L.map("map").setView([25.0408578889, 121.5679], 15);

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
    });
  },
};
</script>

<style scoped>
</style>