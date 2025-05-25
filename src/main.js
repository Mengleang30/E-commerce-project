import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import axios from "axios";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

axios.defaults.withCredentials = true; // Enable sending cookies with requests

app.mount("#app");
