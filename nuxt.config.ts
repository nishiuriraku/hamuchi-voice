import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-12-01',
  devtools: { enabled: true },

  css: [
    '@egjs/vue3-flicking/dist/flicking.css',
    '@egjs/vue3-flicking/dist/flicking-inline.css',
    '@egjs/flicking-plugins/dist/pagination.css',
  ],

  build: {
    transpile: ['vuetify', '@egjs/vue3-flicking'],
  },

  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
  },

  modules: ['nuxt-gtag', 'vuetify-nuxt-module', '@nuxt/fonts'],

  vuetify: {
    moduleOptions: {
      // check https://nuxt.vuetifyjs.com/guide/server-side-rendering.html
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: false,
        prefersColorScheme: false,

        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
      },
      styles: {
        configFile: 'assets/settings.scss',
      },
    },
  },

  fonts: {
    families: [{ name: 'Noto Sans JP', provider: 'google' }, { name: 'Cherry Bomb One', provider: 'google' }],
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/manifest.json' },
      ],
    },
  },
  gtag: {
    id: 'G-FHM8KPLN98',
  },
});
