<template>
  <v-container>
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <v-img class="mb-4" height="150" src="@/assets/500.png" />

      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">サンプラー</div>

        <h1 class="text-h2 font-weight-bold">ハムチ🐹</h1>
      </div>

      <v-row align="center" justify="center" class="mt-6 pb-6">
        <v-col
          v-for="{ text, fileName } in audios"
          :key="fileName"
          cols="6"
          sm="4"
        >
          <v-btn
            :text="text"
            color="light-blue-lighten-5"
            rounded="lg"
            size="x-large"
            class="w-100"
            @click="play(fileName)"
          />
        </v-col>
      </v-row>

      <v-slider
        v-model="volume"
        color="orange"
        :max="100"
        :min="0"
        :step="1"
        thumb-label
        class="mt-6"
      />
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const volume = ref(50);
const play = (name: string) => {
  const audio = document.createElement('audio');
  audio.src = `${name}.mp3`;
  audio.volume = volume.value / 100;
  audio.play();
};

const audios = [
  { text: 'ﾊﾑﾁでｽ‼️', fileName: 'はむちです' },
  { text: 'ﾊﾑ、ｽﾀｰ', fileName: 'はむすたー、へっへっへっへっ' },
  {
    text: 'ﾊﾑ、ｽﾀｰ (x10)',
    fileName: 'はむすたー、へっへっへっへっ（x10）',
  },
  { text: '🖐️へらに^_^す', fileName: 'へらにす' },
  { text: 'あと5分あれば', fileName: 'あと5分あれば' },
  { text: 'ｳﾏﾏﾁﾏﾁﾏ', fileName: 'ｳﾏﾏﾁﾏﾁﾏ' },
  { text: 'ｻｽ理', fileName: 'ｻｽ理' },
  { text: 'ﾁｬｲﾁｬｲﾁｬｲ', fileName: 'ﾁｬｲﾁｬｲﾁｬｲ' },
  { text: 'ｯﾀｸ…ｼｬｱﾈｪﾅｧ……', fileName: 'ったく ' },
  { text: 'ﾊﾞﾁﾝ', fileName: 'ばちん' },

  { text: 'ﾏﾂｷﾁ‼️', fileName: 'ﾏﾂｷﾁ' },
  { text: '感性変‼️', fileName: '感性変' },
  { text: '結婚結婚結婚‼️', fileName: '結婚結婚結婚' },
  { text: 'ﾊｲﾊｲ沐浴', fileName: '沐浴' },
];
</script>
