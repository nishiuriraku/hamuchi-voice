<template>
  <button
    ref="button"
    @click="
      randomise();
      $emit('click');
    "
    :style="buttonColorStyle"
  >
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

defineEmits<{
  click: [];
}>();

const button = ref<HTMLButtonElement | null>(null);

const color = ref(3);
const previousColor = ref(-1);

const buttonColors = ['#56e4a6', '#24d4f3', '#ff89ba', '#85bcf7'] as const;

const randomise = () => {
  let newColor = color.value;
  while (newColor === color.value) {
    newColor = Math.floor(Math.random() * buttonColors.length);
  }
  previousColor.value = color.value;
  color.value = newColor;
};

const buttonColorStyle = computed(() => ({
  'background-color': buttonColors[color.value],
}));

onMounted(() => {
  color.value = Math.floor(Math.random() * buttonColors.length);
  previousColor.value = color.value;
});
</script>

<style lang="scss" scoped>
button {
  color: #fff;
  font-weight: 500;
  letter-spacing: -0.025em;
  padding: 1.1em 0.8em;
  border-radius: 3em;
  justify-content: center;
  margin: auto;
  min-width: 100%;
  position: relative;
  pointer-events: auto;
  z-index: 1;

  &:hover,
  &:active,
  &:focus {
    outline: none;
  }

  &:active {
    filter: grayscale(10%);
    transition: filter 0.2s ease;
    animation: mochimochi 0.4s ease;
  }
}

@keyframes mochimochi {
  0% {
    transform: scale(1, 0.8);
  }
  20% {
    transform: scale(0.8, 1.1);
  }
  90% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}

@keyframes poyon {
  0% {
    transform: scale(1, 1) translate(0%, 0%);
  }
  15% {
    transform: scale(0.9, 0.9) translate(0%, 5%);
  }
  30% {
    transform: scale(1.1, 0.8) translate(0%, 10%);
  }
  50% {
    transform: scale(0.8, 1.1) translate(0%, -10%);
  }
  70% {
    transform: scale(1.1, 0.9) translate(0%, 5%);
  }
  100% {
    transform: scale(1, 1) translate(0%, 0%);
  }
}
</style>
