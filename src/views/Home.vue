<template>
  <div class="home">
    <Navbar @selectCity="loadCity" />

    <!-- Map -->

    <Map :selectedCity="selectedCity" />

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

    const selectedCity = ref("Taipei");
    const loadCity = (city) => {
      selectedCity.value = city.value;
    };

    return { station, availableBike, loadCity, selectedCity };
  },
};
</script>

<style scoped>
</style>
