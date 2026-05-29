import App from './App.vue'
import 'vfonts/FiraCode.css'
import i18n from './i18n'
import './style.css'
import { createApp } from 'vue'

const app = createApp(App)
app.use(i18n)
app.mount('#app')

