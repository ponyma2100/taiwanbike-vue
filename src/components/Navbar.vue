<template>
  <div class="navbar">
    <nav>
      <div class="logo"><img src="../assets/twlogo.png" alt="" /></div>
      <div class="links">
        <router-link :to="{ name: 'Home' }">尋找Bike</router-link>
        <router-link :to="{ name: 'Guideline' }">車道查詢</router-link>
      </div>
      <div class="search">
        <input type="text" placeholder="輸入您想查詢的路線、景點或餐廳" />
        <img src="../assets/search.png" alt="" />
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
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
.search {
  display: flex;
  align-items: center;
  height: 30px;
  width: 300px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #022020;
  box-sizing: border-box;
  border-radius: 8px;
}
.search input {
  height: 100%;
  border-radius: 8px;
}
.search img {
  cursor: pointer;
  width: 16.69px;
  height: 16.69px;
  margin-right: 5px;
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