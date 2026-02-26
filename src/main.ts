import { createApp } from 'vue'
import './app/assets/style/index.scss'
import App from './App.vue'
import { router } from "./app/router.ts";

createApp(App).use(router).mount('#app')
