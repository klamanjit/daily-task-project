import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";

import TheHeader from "./components/layout/TheHeader.vue";
import TheTopHeader from "./components/layout/TheTopHeader.vue";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButoon.vue";

import MainStore from "./store/MainStore.vue";

const app = createApp(App);

app.use(router);
app.component("the-header", TheHeader);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("the-top-header", TheTopHeader);

app.component("main-store", MainStore);

app.mount("#app");
