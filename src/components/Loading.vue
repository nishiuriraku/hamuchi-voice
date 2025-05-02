<template>
  <div class="loading-container">
    <img src="/hamu.webp" class="rotation" width="100px" height="100px" />
  </div>
</template>

<style scoped>
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
