<template>
  <v-container>
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <Header />
      <div class="mt-6 d-flex justify-center align-center">
        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" variant="text" color="primary">
              ハムチ用語説明
            </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card color="#fff6e0" max-height="600">
              <v-card-title class="text-h6 text-center opacity-80">
                ハムチ用語説明
              </v-card-title>
              <v-card-item>
                <div
                  v-for="(
                    { text, fileName, description }, audioIndex
                  ) in audios[currentPageIndex]"
                  :key="'group' + audioIndex"
                >
                  <v-card-title
                    class="opacity-80 mb-2 d-flex align-center ga-2"
                  >
                    {{ text }}
                    <v-btn
                      variant="text"
                      color="primary"
                      icon="mdi-play"
                      size="small"
                      @click="playSampleAudio(fileName)"
                    ></v-btn>
                  </v-card-title>

                  <v-card-text class="opacity-70 mb-6 text-pre-line">
                    <p v-html="withLink(description)"></p>
                  </v-card-text>
                </div>
              </v-card-item>
            </v-card>
          </template>
        </v-dialog>
      </div>

      <div class="mb-10">
        <Flicking
          :options="{
            align: 'prev',
            circular: true,
            preventClickOnDrag: false,
            interruptable: true,
          }"
          :plugins="plugins"
          @changed="onPageChange"
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
                <audio :id="fileName" :src="`${fileName}.mp3`" />
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
import { audios } from '@/contents';

const volume = ref(50);
const currentPageIndex = ref(0);

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
  if (!audioBuffer) {
    // AudioBufferがまだロードされていない場合は再生しない
    return;
  }
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

const playSampleAudio = (fileName: string) => {
  const audio = document.getElementById(fileName) as HTMLAudioElement;
  if (audio) {
    audio.volume = volume.value / 100;
    audio.play();
  }
};

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

import Flicking from '@egjs/vue3-flicking';
import { Pagination } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/pagination.css';

const plugins = [new Pagination({ type: 'bullet' })];

const onPageChange = (e: {
  index: number;
  panel: any;
  prevIndex: number;
  prevPanel: any;
  isTrusted: boolean;
  direction: string;
}) => {
  currentPageIndex.value = e.index;
};

const withLink = (text: string) => {
  return text.replace(
    /https?:\/\/([^\s]+)/g,
    '<a href="$&" target="_blank">$1</a>'
  );
};
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
