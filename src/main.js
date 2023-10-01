import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";

import TheHeader from "./components/layout/TheHeader.vue";
import TheTopHeader from "./components/layout/TheTopHeader.vue";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseDialog from "./components/ui/BaseDialog.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";

import MainStore from "./store/MainStore.vue";

const app = createApp(App);

app.use(router);

app.component("the-header", TheHeader);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("the-top-header", TheTopHeader);
app.component("base-dialog", BaseDialog);
app.component("main-store", MainStore);
app.component("base-spinner", BaseSpinner);

app.mount("#app");
