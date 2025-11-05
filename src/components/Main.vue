<template>
  <v-container>
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <Header />

      <div class="mb-10">
        <Flicking
          :options="{
            align: 'prev',
            circular: true,
            preventClickOnDrag: false,
            interruptable: true,
          }"
          :plugins="plugins"
        >
          <div
            v-for="(group, pageIndex) in audios"
            :key="'group' + pageIndex"
            class="w-100"
          >
            <v-row align="center" justify="center" class="mt-6 pb-6 px-2">
              <v-col
                cols="6"
                v-for="({ text, fileName }, audioIndex) in group"
                :key="fileName"
              >
                <Button
                  :text="text"
                  @click="play(audioIndex, pageIndex)"
                  class="w-100"
                />
                <audio :src="`${fileName}.mp3`" />
              </v-col>
            </v-row>
          </div>
          <template #viewport>
            <div class="flicking-pagination"></div>
          </template>
        </Flicking>
      </div>

      <v-slider
        label="音量"
        v-model="volume"
        color="primary"
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

      <Transition name="fade">
        <Loading v-if="loading" />
      </Transition>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
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

const play = async (audioIndex: number, pageIndex: number) => {
  const index = audioIndex + pageIndex * 8;
  // ArrayBuffer をデコードして AudioBuffer オブジェクトを取得
  const audioBuffer = audioResponses.value[index];
  const audioBufferNode = prepareAudioBufferNode(audioBuffer);
  // オーディオを再生
  audioBufferNode.start(0);
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const loading = ref(false);
const audioResponses = ref<AudioBuffer[]>([]);
onMounted(() => {
  const getAudioBuffer = async () => {
    try {
      const fetchsAudioBuffer: AudioBuffer[] = [];
      for (const audio of audios) {
        for (const { fileName } of audio) {
          const response = await fetch(`${fileName}.mp3`);
          const responseBuffer = await response.arrayBuffer();
          const audioBuffer = await audioCtx.decodeAudioData(responseBuffer);
          fetchsAudioBuffer.push(audioBuffer);
        }
      }
      return fetchsAudioBuffer;
    } catch (e) {
      console.error(e);
    }
  };

  loading.value = true;
  getAudioBuffer().then((e) => {
    if (e) audioResponses.value = e;
    loading.value = false;
  });
});

const audios = [
  [
    { text: 'ﾊﾑﾁでｽ‼️', fileName: 'はむちです' },
    { text: 'ﾊﾑ、ｽﾀｰ', fileName: 'はむすたー、へっへっへっへっ' },
    { text: 'ﾊﾑ、ｽﾀｰ (x10)', fileName: 'はむすたー、へっへっへっへっ（x10）' },
    { text: '🖐️へらに^_^す', fileName: 'へらにす' },
    { text: 'あと5分あれば', fileName: 'あと5分あれば' },
    { text: 'ｳﾏﾏﾁﾏﾁﾏ(short)', fileName: 'ｳﾏﾏﾁﾏﾁﾏ(short)' },
    { text: 'ｳﾏﾏﾁﾏﾁﾏ', fileName: 'ｳﾏﾏﾁﾏﾁﾏ' },
    { text: 'ｻｽ理', fileName: 'ｻｽ理' },
  ],
  [
    { text: 'ﾁｬｲﾁｬｲﾁｬｲ', fileName: 'ﾁｬｲﾁｬｲﾁｬｲ' },
    { text: 'ｯﾀｸ…ｼｬｱﾈｪﾅｧ……', fileName: 'ったく ' },
    { text: 'ﾊﾞﾁﾝ', fileName: 'ばちん' },
    { text: 'ﾏﾂｷﾁ‼️', fileName: 'ﾏﾂｷﾁ' },
    { text: '感性変‼️', fileName: '感性変' },
    { text: 'ｳﾙﾁｪ‼️', fileName: 'ｳﾙﾁｪｴ' },
    { text: '結婚結婚結婚‼️', fileName: '結婚結婚結婚' },
    { text: 'ﾊｲﾊｲ沐浴', fileName: '沐浴' },
  ],
  [
    { text: 'ｼﾈﾄﾞｽ', fileName: 'ｼﾈﾄﾞｽ' },
    { text: 'ﾜﾀﾞﾜﾀﾞﾜﾀﾞﾜﾀﾞ', fileName: 'ﾜﾀﾞﾜﾀﾞﾜﾀﾞﾜﾀﾞ' },
    { text: 'ｻｲﾃｰ‼️ｳﾝﾁ‼️', fileName: 'サイテー！ウンチ！' },
    { text: 'ｱﾁ‼️', fileName: 'ｱﾁ' },
    { text: 'ありゃとありゃと', fileName: 'ありゃとありゃと' },
    { text: 'ﾊﾞﾊﾞﾝﾁ‼️', fileName: 'ﾊﾞﾊﾞﾝﾁ' },
    { text: '了解', fileName: '了解' },
    { text: 'ありがとっ', fileName: 'ありがとっ' },
  ],
  [
    { text: 'ちょうど終わるとこ', fileName: 'ちょうど終わるとこ' },
    { text: 'ｼｬﾗｸｾｪ‼️', fileName: 'ｼｬﾗｸｾｪ' },
    { text: '涙の味もしないや', fileName: '涙の味もしないや' },
    { text: 'ボケナス', fileName: 'ボケナス' },
    { text: '次はシバきます', fileName: '次はシバきます' },
    { text: 'ﾔﾍﾞ‼️', fileName: 'ﾔﾍﾞ' },
    { text: '光あﾝねﾝ', fileName: '光あﾝねﾝ' },
    { text: '半返しするねー！', fileName: '半返しするねー！' },
  ],
  [
    { text: 'ほぁ', fileName: 'ほぁ' },
    { text: 'ﾎﾟｲﾝﾎﾟｲﾝ', fileName: 'ﾎﾟｲﾝﾎﾟｲﾝ' },
    { text: 'おはよおはよ', fileName: 'おはよおはよおはよ' },
    { text: 'ﾅｲﾊﾞﾁ', fileName: 'ﾅｲﾊﾞﾁﾅﾊﾞﾁﾅﾊﾞﾊﾞﾁﾏ' },
    { text: 'ﾎﾞﾍﾎﾞﾍﾎﾞﾍ', fileName: 'ﾎﾞﾍﾎﾞﾍﾎﾞﾍ' },
    { text: 'ﾌﾟｽｯ', fileName: 'ﾌﾟｽｯ' },
    { text: 'めろりーん', fileName: 'めろりーん' },
    { text: 'しゃるどね', fileName: 'しゃるどねーしょーん' },
  ],
  [
    { text: 'カーー', fileName: 'カーー' },
    { text: 'ちゆ', fileName: 'ちゆ' },
    { text: 'ウェ～', fileName: 'ウェ～' },
    { text: 'んーーーまっ！', fileName: 'んーーーまっ！' },
    { text: 'ﾍﾞﾍﾞﾝ', fileName: 'ﾍﾞﾍﾞﾝ' },
    { text: 'ぶぇっ', fileName: 'ぶぇっ' },
    { text: 'ｺｺｯ', fileName: 'ｺｺｯ' },
  ],
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

import { Pagination } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/pagination.css';

const plugins = [new Pagination({ type: 'bullet' })];
</script>

<style lang="scss">
.flicking-pagination {
  bottom: -10px;
}
.flicking-viewport {
  overflow: visible !important;
}
.flicking-pagination-bullet-active {
  background-color: #fd8798;
}
.flicking-panel {
  pointer-events: auto;
}
.flicking-panel > * {
  pointer-events: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s cubic-bezier(0, 1, 0, 1);
}

.fade-enter-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}

.visible {
  overflow: visible;
}
</style>
