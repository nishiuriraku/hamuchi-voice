/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

const app = createApp(App);

registerPlugins(app);

import Flicking from '@egjs/vue3-flicking';
import '@egjs/vue3-flicking/dist/flicking.css';
// Or, if you have to support IE9
import '@egjs/vue3-flicking/dist/flicking-inline.css';
app.component('Flicking', Flicking);

app.mount('#app');
