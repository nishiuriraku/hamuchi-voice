<template>
  <div class="text-center mt-4">
    <h1 class="title title-large">ハムチ</h1>
    <div class="title title-small">サンプラー</div>
    <v-img height="100" src="/hamu.webp" @click="onClick" />

    <v-dialog v-model="dialog" transition="scale-transition" fullscreen>
      <v-toolbar style="z-index: 2000" color="transparent">
        <template v-slot:append>
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
const timer = ref<number | null>(null);
const timeout = 1000;
const onClick = () => {
  clickCount.value += 1;
  if (clickCount.value === 1) {
    timer.value = setTimeout(() => {
      if (clickCount.value === 5) {
        console.log('5回クリックした!');
        dialog.value = true;
      }

      timer.value = null;
      clickCount.value = 0;
    }, timeout);
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

  /* filter: drop-shadow(6px 6px 0px #c780a5); */
}
.title-small {
  font-size: 1.5rem;
  line-height: 3.2rem;

  /* filter: drop-shadow(6px 6px 0px #c780a5); */
}
</style>
