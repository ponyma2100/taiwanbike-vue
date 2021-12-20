<template>
  <div class="navbar">
    <nav>
      <div class="logo"><img src="../assets/twlogo.png" alt="" /></div>
      <div class="links">
        <router-link :to="{ name: 'Home' }">尋找Bike</router-link>
        <router-link :to="{ name: 'Guideline' }">車道查詢</router-link>
      </div>
      <div class="select">
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
  justify-content: space-between;
  padding: 20px;
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

a.router-link-active {
  background: #022020;
  color: #ffffff;
  border-radius: 4px;
}
.links {
  display: flex;
  justify-content: space-evenly;
  width: 300px;
}
nav a {
  padding: 5px;
}
</style>