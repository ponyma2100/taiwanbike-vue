<template>
  <div class="card">
    <h5 class="card-title">
      <p>{{ stationInfo.name }}</p>
      <div class="close" @click="handleClose">
        <i class="fas fa-times"></i>
      </div>
    </h5>
    <div class="card-content">
      <p class="card-status">{{ stationInfo.status }}</p>
      <div class="rent-status">
        <div class="rent-status-available">
          <span>可租借車數</span>
          <p>{{ stationInfo.availableBikes }}</p>
        </div>
        <div class="rent-status-return">
          <span>可歸還車數</span>
          <p>{{ stationInfo.returnBikes }}</p>
        </div>
      </div>

      <p class="card-address">
        {{ stationInfo.address }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["stationInfo"],
  setup(props, { emit }) {
    const handleClose = () => {
      emit("closeCard");
    };
    return { handleClose };
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background: #ffffff;
  height: 171px;
  width: 320px;
  bottom: 50px;
  left: 50%;
  border-radius: 8px;
  position: absolute;
  z-index: 999;
  cursor: auto;
}
.card-title {
  display: flex;
  justify-content: space-between;
  height: 28px;
  background: #022020;
  border-radius: 8px 8px 0px 0px;
  font-size: 18px;
}
.card-title p,
.fa-times {
  color: #ffffff;
  margin: 0 3px;
}

.fa-times {
  cursor: pointer;
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.rent-status {
  display: flex;
  justify-content: space-around;
}

.rent-status p {
  height: 28px;
  width: 30px;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.04em;
  color: #022020;
}

.rent-status span {
  font-size: 16px;
  color: #6d6d6d;
}

.rent-status-available,
.rent-status-return {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.card-status {
  font-weight: bold;
  font-size: 20px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  letter-spacing: 0.04em;
  color: #07b041;
}
</style>