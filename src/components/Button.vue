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
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

defineEmits(['click']);

const button = ref<HTMLButtonElement | null>(null);

const color = ref(3);
const previousColor = ref(-1);

const randomise = () => {
  let newColor;
  do {
    newColor = Math.floor(Math.random() * buttonColors.length);
  } while (newColor === color.value);
  previousColor.value = color.value;
  color.value = newColor;
};

const buttonColorStyle = computed(() => ({
  'background-color': `${buttonColors[color.value]}`,
}));

onMounted(() => {
  color.value = Math.floor(Math.random() * buttonColors.length);
  previousColor.value = color.value;
});

const buttonColors = ['#56e4a6', '#24d4f3', '#ff89ba', '#85bcf7'];
</script>

<style lang="scss" scoped>
/* @use '../assets/aquabutton.scss'; */

button {
  /* background-color: #56e4a6; */

  color: #fff;

  font-weight: 500;
  letter-spacing: -0.025em;

  padding: 1.1em 0.8em;
  border-radius: 3em;

  justify-content: center;
  margin: auto;
  min-width: 100%;

  position: relative;

  &:hover,
  &:active,
  &:focus {
    outline: none;
  }

  &:active {
    /* scale: 0.95; */
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
