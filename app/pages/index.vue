<template>
  <v-app>
    <v-main>
      <Main @loaded="loading = false" />
    </v-main>
    <Footer />

    <Transition name="fade">
      <Loading v-if="loading" />
    </Transition>
  </v-app>
</template>

<script setup lang="ts">
const loading = ref(true);

const title = 'ハムチサンプラー';
const description = 'ハムチをｷﾞｭｯとまとめました';
const url = 'https://sampler.hamuchi.world/';
const ogp = url + 'ogp.png';

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogUrl: url,
  ogImage: ogp,
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogType: 'website',
  ogSiteName: title,
  ogLocale: 'ja_JP',
  twitterCard: 'summary_large_image',
  twitterSite: '@hamutima_86',
  twitterCreator: '@nishiuriraku',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogp,
});
</script>
