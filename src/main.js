import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

/* https://github.com/vitejs/vite/issues/7555#issuecomment-1141193871 */
import { Buffer } from "buffer";
import EventEmitter from "events";
import process from "process";

window.Buffer = Buffer;
window.EventEmitter = EventEmitter;
window.process = process;
/* up to here */

loadFonts();

const pinia = createPinia();
createApp(App).use(router).use(pinia).use(vuetify).mount("#app");
