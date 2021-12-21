<template>
  <div class="Route">
    <Navbar @selectCity="loadCity" />
    <RouteMap :selectedCity="selectedCity" />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Navbar from "../components/Navbar.vue";
import RouteMap from "../components/RouteMap.vue";

export default {
  components: { Navbar, RouteMap },
  setup() {
    const selectedCity = ref("Taipei");
    const loadCity = (city) => {
      selectedCity.value = city.value;
    };

    return { loadCity, selectedCity };
  },
};
</script>

<style>
</style>