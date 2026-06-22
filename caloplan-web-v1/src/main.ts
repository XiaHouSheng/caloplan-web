import App from './App.vue'
import 'vfonts/FiraCode.css'
import './style.css'
import dialog from './utils/dialog'
import i18n from './i18n'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(i18n)
app.use(pinia)
app.config.globalProperties.$dialog = dialog
app.mount('#app')

