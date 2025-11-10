<template>
  <v-footer class="d-flex align-center justify-center" color="secondary">
    <v-btn
      icon="mdi-share-variant"
      class="button"
      variant="text"
      @click="onShare"
    />

    <v-btn
      href="https://github.com/nishiuriraku/sampler.hamuchi.world"
      target="_blank"
      icon="mdi-github"
      class="button"
      variant="text"
    />
  </v-footer>
</template>

<script setup lang="ts">
const onShare = async () => {
  const text = '今ハムチのボイスを聴いています！';
  const url = location.origin;
  const hashtags = ['#ハムチサンプラー', '#ウママチハムチ', '#NowPlaying'];

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'ハムチサンプラー',
        text: `${text}\n${url}\n\n${hashtags.join(' ')}`,
        url,
      });
    } catch (error) {
      console.log('Share cancelled');
    }
  } else {
    // フォールバック: クリップボードにコピー
    try {
      await navigator.clipboard.writeText(
        `${text}\n${url}\n\n${hashtags.join(' ')}`
      );
      alert('結果をクリップボードにコピーしました！');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }
};
</script>

<style scoped>
.button {
  color: #424242;
}
</style>
