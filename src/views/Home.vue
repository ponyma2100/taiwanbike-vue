<template>
  <div class="home">
    <Navbar @selectCity="loadCity" />

    <!-- Map -->
    <div id="map">
      <Map :selectedCity="selectedCity" />
    </div>
    <!-- <BikeInfo :station="station" /> -->
  </div>
</template>

<script>
import Navbar from ".././components/Navbar.vue";
import Map from ".././components/Map.vue";
import getBike from ".././composables/getBike";
import { ref } from "@vue/reactivity";

export default {
  name: "Home",
  components: { Navbar, Map },

  setup() {
    const { getStation, station, getAvailableBike, availableBike } = getBike();
    getStation();
    getAvailableBike();

    const selectedCity = ref("");
    const loadCity = (city) => {
      selectedCity.value = city.value;
      console.log("selectedCity.value", selectedCity.value);
    };

    return { station, availableBike, loadCity, selectedCity };
  },
};
</script>

<style scoped>
#map {
  height: 90vh;
  z-index: 10;
}
</style>
