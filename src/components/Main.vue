<template>
  <v-container>
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <Header />

      <v-row align="center" justify="center" class="mt-6 pb-6 px-2">
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
          <audio :src="`${fileName}.mp3`" />
        </v-col>
      </v-row>

      <v-slider
        label="音量"
        v-model="volume"
        color="orange"
        :max="100"
        :min="0"
        :step="1"
        thumb-label
        class="mt-6 px-2"
      />

      <v-select
        label="再生速度"
        v-model="playbackRate"
        :items="playbackRateItems"
        variant="outlined"
      />
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const volume = ref(50);

const audioCtx = new AudioContext();

/** 音源再生のために準備を行う */
const prepareAudioBufferNode = (audioBuffer: AudioBuffer) => {
  const gainNode = audioCtx.createGain();
  const audioBufferNode = audioCtx.createBufferSource();
  audioBufferNode.buffer = audioBuffer;
  audioBufferNode.connect(gainNode).connect(audioCtx.destination);
  gainNode.gain.value = volume.value / 100;
  audioBufferNode.playbackRate.value = playbackRate.value;
  return audioBufferNode;
};

const play = async (name: string) => {
  // fetch で sound.mp3 ファイルをダウンロードして ArrayBuffer を取得
  const response = await fetch(`${name}.mp3`);
  const responseBuffer = await response.arrayBuffer();

  // ArrayBuffer をデコードして AudioBuffer オブジェクトを取得
  const audioBuffer = await audioCtx.decodeAudioData(responseBuffer);
  const audioBufferNode = prepareAudioBufferNode(audioBuffer);
  // オーディオを再生
  audioBufferNode.start(0);
};

const audios = [
  { text: 'ﾊﾑﾁでｽ‼️', fileName: 'はむちです' },
  { text: 'ﾊﾑ、ｽﾀｰ', fileName: 'はむすたー、へっへっへっへっ' },
  { text: 'ﾊﾑ、ｽﾀｰ (x10)', fileName: 'はむすたー、へっへっへっへっ（x10）' },
  { text: '🖐️へらに^_^す', fileName: 'へらにす' },
  { text: 'あと5分あれば', fileName: 'あと5分あれば' },
  { text: 'ｳﾏﾏﾁﾏﾁﾏ(short)', fileName: 'ｳﾏﾏﾁﾏﾁﾏ(short)' },
  { text: 'ｳﾏﾏﾁﾏﾁﾏ', fileName: 'ｳﾏﾏﾁﾏﾁﾏ' },
  { text: 'ｻｽ理', fileName: 'ｻｽ理' },
  { text: 'ﾁｬｲﾁｬｲﾁｬｲ', fileName: 'ﾁｬｲﾁｬｲﾁｬｲ' },
  { text: 'ｯﾀｸ…ｼｬｱﾈｪﾅｧ……', fileName: 'ったく ' },
  { text: 'ﾊﾞﾁﾝ', fileName: 'ばちん' },
  { text: 'ﾏﾂｷﾁ‼️', fileName: 'ﾏﾂｷﾁ' },
  { text: '感性変‼️', fileName: '感性変' },
  { text: 'ｳﾙﾁｪ‼️', fileName: 'ｳﾙﾁｪｴ' },
  { text: '結婚結婚結婚‼️', fileName: '結婚結婚結婚' },
  { text: 'ﾊｲﾊｲ沐浴', fileName: '沐浴' },
  { text: 'ｼﾈﾄﾞｽ', fileName: 'ｼﾈﾄﾞｽ' },
  { text: 'ﾜﾀﾞﾜﾀﾞﾜﾀﾞﾜﾀﾞ', fileName: 'ﾜﾀﾞﾜﾀﾞﾜﾀﾞﾜﾀﾞ' },
  { text: 'サイテー‼️ウンチ‼️', fileName: 'サイテー！ウンチ！' },
];

const playbackRate = ref(1);
const playbackRateItems = [
  { title: '0.25', value: 0.25 },
  { title: '0.5', value: 0.5 },
  { title: '0.75', value: 0.75 },
  { title: '標準', value: 1 },
  { title: '1.25', value: 1.25 },
  { title: '1.5', value: 1.5 },
  { title: '1.75', value: 1.75 },
  { title: '2', value: 2 },
  { title: '10', value: 10 },
  { title: '15', value: 15 },
];
</script>
