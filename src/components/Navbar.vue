<template>
  <div class="navbar">
    <nav>
      <router-link :to="{ name: 'Home' }">
        <div class="logo"><img src="../assets/twlogo.png" alt="" /></div>
      </router-link>
      <div class="links">
        <router-link :to="{ name: 'Home' }">尋找Bike</router-link>
        <router-link :to="{ name: 'Route' }">車道查詢</router-link>
      </div>
      <div class="select" v-if="$route.name === 'Home'">
        <select v-model="selected" @click="changeItem" @change="handleChange">
          <option v-for="city in cityMapping" :key="city" :value="city.engName">
            {{ city.chtName }}
          </option>
        </select>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import cityMapping from "../data/cityMapping";
export default {
  setup(props, { emit }) {
    const selected = ref("Taipei");
    emit("selectCity", selected);

    const changeItem = (e) => {
      emit("selectCity", selected);
    };

    return { cityMapping, selected, changeItem };
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  padding: 20px;
  position: relative;
}
.navbar {
  height: 80px;
  border: 1px solid black;
}
select {
  height: 30px;
  width: 80px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #022020;
  box-sizing: border-box;
}

.links > a.router-link-active {
  background: #022020;
  color: #ffffff;
  border-radius: 4px;
}
.links {
  display: flex;
  justify-content: space-evenly;
  width: 300px;
  position: absolute;
  left: 45%;
}
nav a {
  padding: 5px;
}
.select {
  margin-left: auto;
}
</style>