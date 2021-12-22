<template>
  <div id="map"></div>
  <Sidebar @polyLine="drawPolyLine" />
</template>

<script>
import L from "leaflet";
import markerClusterGroup from "leaflet.markercluster";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import getBike from ".././composables/getBike";
import Sidebar from "../components/Sidebar.vue";
import startIconUrl from "../assets/starticon.png";
import endIconUrl from "../assets/endicon.png";
import { onMounted } from "@vue/runtime-core";

export default {
  components: { Sidebar },
  props: ["selectedCity"],
  setup(props) {
    const { getBikeShape, bikeShape } = getBike();
    getBikeShape(props.selectedCity);

    let mymap = {};
    let myLayer = null;
    let startIcon = L.icon({
      iconUrl: startIconUrl,
      iconSize: [36, 36], // size of the icon
    });
    let endIcon = L.icon({
      iconUrl: endIconUrl,
      iconSize: [36, 36], // size of the icon
    });

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

    const removePolyLine = () => {
      if (myLayer) {
        mymap.removeLayer(myLayer);
      }
    };

    const drawPolyLine = (data) => {
      removePolyLine();
      clearMarkers();
      bikePolyLine(data);
    };

    const bikePolyLine = (data) => {
      // 建立一個 wkt 的實體
      const wicket = new Wkt.Wkt();
      const geojsonFeature = wicket.read(data.Geometry).toJson();

      const position = geojsonFeature.coordinates[0];
      const positionStart = position[0];
      const positionEnd = position[position.length - 1];

      if (geojsonFeature) {
        L.marker([positionStart[1], positionStart[0]], {
          icon: startIcon,
        }).addTo(mymap);
        L.marker([positionEnd[1], positionEnd[0]], { icon: endIcon }).addTo(
          mymap
        );
      }

      const myStyle = {
        color: "#07B041",
        weight: 5,
        opacity: 0.65,
      };
      myLayer = L.geoJSON(geojsonFeature, {
        style: myStyle,
      }).addTo(mymap);

      myLayer.addData(geojsonFeature);
      // zoom the map to the layer
      mymap.fitBounds(myLayer.getBounds());
    };

    // remove all markers
    const clearMarkers = () => {
      mymap.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mymap.removeLayer(layer);
        }
      });
    };

    return { drawPolyLine };
  },
};
</script>

<style scoped>
</style>