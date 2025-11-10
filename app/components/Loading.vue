<template>
  <div class="loading-container">
    <div>
      <img src="/hamu.webp" class="rotation" width="100" height="100" />
      <p>なうろーでぃんぐ</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #ffe3f6;
  z-index: 1000;
  font-family: 'Cherry Bomb One', sans-serif;
}
.rotation {
  animation: 3s linear infinite rotation;
}

@keyframes rotation {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

