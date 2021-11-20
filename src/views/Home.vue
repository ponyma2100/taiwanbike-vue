<template>
  <div class="home">
    <!-- Map -->
    <div id="map"></div>
  </div>
</template>

<script>
import leaflet from "leaflet";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "Home",

  setup() {
    let mymap;
    onMounted(() => {
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
    });
  },
};
</script>

<style scoped>
#map {
  height: 90vh;
}
</style>
