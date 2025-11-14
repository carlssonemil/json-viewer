import { createApp } from "vue";

import { init } from "@plausible-analytics/tracker";

import VueTippy from "vue-tippy";
import "tippy.js/dist/tippy.css";

import App from "./App.vue";
import "./style.css";

import BaseIcon from "./components/ui/BaseIcon.vue";
import BaseInlineButton from "./components/ui/BaseInlineButton.vue";
import BaseTextarea from "./components/ui/BaseTextarea.vue";

const app = createApp(App);

app.component("BaseIcon", BaseIcon);
app.component("BaseInlineButton", BaseInlineButton);
app.component("BaseTextarea", BaseTextarea);

app.use(VueTippy).mount("#app");

init({
  domain: "json.emca.app",
});
