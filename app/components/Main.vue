<template>
  <v-container>
    <v-responsive class="align-center fill-height mx-auto" max-width="900">
      <Header />

      <div class="mt-6 d-flex justify-center align-center">
        <v-dialog max-width="500">
          <template #activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" variant="text" color="primary">
              ハムチ用語説明
            </v-btn>
          </template>

          <template #default>
            <v-card color="#fff6e0" max-height="600">
              <v-card-title class="text-h6 text-center opacity-80">
                ハムチ用語説明
              </v-card-title>
              <v-card-item>
                <div
                  v-for="(
                    { text, fileName, description }, audioIndex
                  ) in audios[currentPageIndex]"
                  :key="`group-${currentPageIndex}-audio-${audioIndex}`"
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
                    />
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
        <ClientOnly>
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
              :key="`page-${pageIndex}`"
              class="w-100"
            >
              <v-row align="center" justify="center" class="mt-6 pb-6 px-2">
                <v-col
                  v-for="({ text, fileName }, audioIndex) in group"
                  :key="fileName"
                  cols="6"
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
        </ClientOnly>
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
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking';
import { Pagination } from '@egjs/flicking-plugins';
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import { audios } from '~/utils/contents';

const emit = defineEmits<{
  (e: 'loaded'): void;
}>();

const volume = ref<number>(50);

const audioBuffers = shallowRef<AudioBuffer[]>([]);
const audioCtx = shallowRef<AudioContext | null>(null);

const ensureAudioContext = () => {
  if (!import.meta.client) {
    throw new Error('AudioContext is only available on the client.');
  }

  if (!audioCtx.value) {
    audioCtx.value = new AudioContext();
  }

  return audioCtx.value;
};

onBeforeUnmount(() => {
  if (audioCtx.value) {
    void audioCtx.value.close();
    audioCtx.value = null;
  }
});

const prepareAudioBufferNode = (ctx: AudioContext, buffer: AudioBuffer) => {
  const gainNode = ctx.createGain();
  const bufferNode = ctx.createBufferSource();
  bufferNode.buffer = buffer;
  bufferNode.connect(gainNode).connect(ctx.destination);
  gainNode.gain.value = volume.value / 100;
  bufferNode.playbackRate.value = playbackRate.value;
  return bufferNode;
};

const flattenIndex = (audioIndex: number, pageIndex: number) => {
  const preceding = audios
    .slice(0, pageIndex)
    .reduce((acc, group) => acc + group.length, 0);
  return preceding + audioIndex;
};

const play = (audioIndex: number, pageIndex: number) => {
  if (!import.meta.client) {
    return;
  }

  const index = flattenIndex(audioIndex, pageIndex);
  const buffer = audioBuffers.value[index];
  if (!buffer) {
    return;
  }

  const ctx = ensureAudioContext();
  const node = prepareAudioBufferNode(ctx, buffer);
  node.start();
};

const fetchAudioBuffers = async () => {
  if (!import.meta.client) {
    return [];
  }

  const ctx = ensureAudioContext();
  const buffers: AudioBuffer[] = [];

  for (const group of audios) {
    for (const { fileName } of group) {
      const response = await fetch(`${fileName}.mp3`);
      const responseBuffer = await response.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(responseBuffer);
      buffers.push(audioBuffer);
    }
  }

  return buffers;
};

onMounted(async () => {
  if (!import.meta.client) {
    return;
  }

  try {
    audioBuffers.value = await fetchAudioBuffers();
  } catch (error) {
    console.error('Failed to load audio buffers', error);
  } finally {
    emit('loaded');
  }
});

const playSampleAudio = (fileName: string) => {
  if (!import.meta.client) {
    return;
  }
  const audio = document.getElementById(fileName) as HTMLAudioElement | null;
  if (audio) {
    audio.volume = volume.value / 100;
    void audio.play();
  }
};

const playbackRate = ref<number>(1);
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
] as const satisfies readonly { title: string; value: number }[];

const currentPageIndex = ref<number>(0);

const plugins = [new Pagination({ type: 'bullet' })];

const onPageChange = (event: {
  index: number;
  panel: unknown;
  prevIndex: number;
  prevPanel: unknown;
  isTrusted: boolean;
  direction: string;
}) => {
  currentPageIndex.value = event.index;
};

const withLink = (text: string) => {
  return text.replace(
    /https?:\/\/([^\s]+)/g,
    '<a href="$&" target="_blank" rel="noopener noreferrer">$1</a>'
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
</style>
