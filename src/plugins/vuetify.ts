/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        colors: {
          background: '#fff6e0',
          primary: '#fd8798',
          // surface: '#FFFFFF',
          // 'surface-bright': '#FFFFFF',
          // 'surface-light': '#EEEEEE',
          // 'surface-variant': '#424242',
          // 'on-surface-variant': '#EEEEEE',
          // primary: '#1867C0',
          // 'primary-darken-1': '#1F5592',
          // secondary: '#48A9A6',
          // 'secondary-darken-1': '#018786',
          // error: '#B00020',
          // info: '#2196F3',
          // success: '#4CAF50',
          // warning: '#FB8C00',
        },
      },
    },
  },
});
