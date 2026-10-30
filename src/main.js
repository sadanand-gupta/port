import { createApp } from "vue";
import App from "./App.vue";
import reveal from "./reveal";
import "./style.css";

createApp(App).directive("reveal", reveal).mount("#app");
