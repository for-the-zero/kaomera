import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import { createPinia } from 'pinia';

createApp(App).use(createPinia()).mount("#app");
