import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";

import TheHeaderTest from "./components/layout/TheHeaderTest.vue";
import TheTopHeader from "./components/layout/TheTopHeader.vue";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButoon.vue";
import BaseDialog from "./components/ui/BaseDialog.vue";

import MainStore from "./store/MainStore.vue";

const app = createApp(App);

app.use(router);

app.component("the-header-test", TheHeaderTest);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("the-top-header", TheTopHeader);
app.component("base-dialog", BaseDialog);

app.component("main-store", MainStore);

app.mount("#app");
