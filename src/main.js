import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import axios from "axios";
import { GoogleLogin } from "vue3-google-login";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(GoogleLogin, {
    clientId : "220348882770-ssl03vhckbpbsrm1g9j4dbt2cvcopfl4.apps.googleusercontent.com"
})
axios.defaults.withCredentials = true; // Enable sending cookies with requests

app.mount("#app");

