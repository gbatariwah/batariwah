import { createApp } from "vue";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin(async (NuxtApp) => {
  NuxtApp.vueApp.use(Toast, { timeout: 3000 });
});
