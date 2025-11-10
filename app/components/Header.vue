<template>
  <div class="text-center mt-4">
    <h1 class="title title-large">ハムチ</h1>
    <div class="title title-small">サンプラー</div>
    <v-img height="100" src="/hamu.webp" @click="onClick" />

    <v-dialog v-model="dialog" transition="scale-transition" fullscreen>
      <v-toolbar style="z-index: 2000" color="transparent">
        <template #append>
          <v-btn icon="mdi-close" @click="dialog = false" />
        </template>
      </v-toolbar>
      <Loading />
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false);
const clickCount = ref(0);
const timer = ref<ReturnType<typeof setTimeout> | null>(null);
const timeout = 1000;

const reset = () => {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }
  clickCount.value = 0;
};

const onClick = () => {
  clickCount.value += 1;

  if (clickCount.value === 1) {
    timer.value = setTimeout(() => {
      if (clickCount.value === 5) {
        dialog.value = true;
      }
      reset();
    }, timeout);
  }

  if (clickCount.value > 5) {
    reset();
  }
};
</script>

<style scoped>
.title {
  font-family: 'Cherry Bomb One', sans-serif !important;
  color: #85bcf7;
}
.title-large {
  font-size: 5rem;
  line-height: 4rem;
  color: #6aadf5;
}
.title-small {
  font-size: 1.5rem;
  line-height: 3.2rem;
}
</style>

