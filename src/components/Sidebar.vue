<template>
  <div class="sidebar">
    <div class="selector">
      <div class="citySelector">
        <label for="citySelect">查詢地區 : </label>
        <select
          v-model="citySelected"
          @click="changeItem"
          @change="handleChange"
          id="citySelect"
        >
          <option
            v-for="city in cityName"
            :key="city.CityID"
            :value="city.City"
          >
            {{ city.CityName }}
          </option>
        </select>
      </div>
      <div class="directionSelector">
        <label for="directionSelect">方向 : </label>
        <select
          id="directionSelect"
          v-model="directionSelected"
          @click="changeDirection"
        >
          <option value="0">不拘</option>
          <option value="1">單向</option>
          <option value="2">雙向</option>
        </select>
      </div>
    </div>
    <div class="bikeroute">
      <h4>地區內的自行車道 :</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="route in filterRoute"
          :key="route.RouteName"
          @click="handlePolyLine(route)"
        >
          <div class="bike-info">
            <div class="bike-info-name">
              <p>{{ route.RouteName }}</p>
            </div>
            <div class="bike-info-length">
              <p>{{ route.CyclingLength }} M</p>
            </div>
            {{ route.Direction }}
            <div class="bike-info-start">
              <span>起點</span>
              <p>{{ route.RoadSectionStart }}</p>
            </div>
            <div class="bike-info-end">
              <span>迄點</span>
              <p>{{ route.RoadSectionEnd }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import cityName from "../data/cityName";
import getBike from ".././composables/getBike";
import { watch } from "@vue/runtime-core";

export default {
  setup(props, { emit }) {
    const { getBikeShape, bikeShape } = getBike();
    const citySelected = ref("Taipei");
    const directionSelected = ref("0");

    getBikeShape(citySelected.value);

    watch(
      () => citySelected.value,
      async () => {
        await getBikeShape(citySelected.value);
      }
    );
    watch(
      () => directionSelected.value,
      () => {
        console.log("directionSelected", directionSelected.value);
      }
    );

    //  filter route direction
    const filterRoute = computed(() => {
      if (directionSelected.value === "0") {
        return bikeShape.value;
      } else if (directionSelected.value === "1") {
        return bikeShape.value.filter((bike) =>
          bike.Direction.includes("單向")
        );
      } else if (directionSelected.value === "2") {
        return bikeShape.value.filter((bike) =>
          bike.Direction.includes("雙向")
        );
      }
    });

    const handlePolyLine = (data) => {
      emit("polyLine", data);
    };

    return {
      cityName,
      citySelected,
      bikeShape,
      handlePolyLine,
      directionSelected,
      filterRoute,
    };
  },
};
</script>

<style scopde>
.sidebar {
  width: 25vw;
  height: 90vh;
  min-width: 300px;
  max-height: 90vh;
  overflow-y: scroll;
  background: #ffffff;
  position: absolute;
  top: 80px;
  z-index: 999;
}
.selector {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25vw;
  min-width: 300px;
  height: 10vh;
  text-align: center;
  position: fixed;
  background: #ffffff;
  letter-spacing: 0.04em;
  color: #7d7d7d;
  border: 1px solid black;
  z-index: 999;
}
.citySelector,
.directionSelector {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}
.citySelector > select,
.directionSelector > select {
  background: #e5e5e5;
  border-radius: 8px;
  width: 80px;
  color: #07b041;
}
ul {
  position: absolute;
  top: 130px;
}

ul > li {
  width: 460px;
  height: 122px;
  background: #ffffff;
}
ul > li:hover {
  background: #e4e4e4;
  cursor: pointer;
}

.bikeroute > h4 {
  position: absolute;
  top: 100px;
  padding: 5px 40px;
}

.list-group-item {
  width: 20vw;
  height: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 40px;
  text-align: start;
  line-height: 1.5rem;
}
.bike-info-name {
  color: #022020;
  font-weight: bold;
  letter-spacing: 0.04em;
  margin-bottom: 5px;
}
.bike-info-length {
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.04em;
  color: #07b041;
  margin-bottom: 5px;
}

.bike-info-start,
.bike-info-end {
  display: flex;
  margin-bottom: 5px;
  color: #07b041;
}
.bike-info-start > p,
.bike-info-end > p {
  margin-left: 5px;
  color: #7d7d7d;
}
</style>