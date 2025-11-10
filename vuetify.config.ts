import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        colors: {
          background: '#fff6e0',
          primary: '#fd8798',
          secondary: '#ffe3f6',
        },
      },
    },
  },
});
