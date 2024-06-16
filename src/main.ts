import './assets/main.css'
import './index.css'
import '../node_modules/flowbite-vue/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { type AxiosInstance } from 'axios'
import axiosInstanceConfig from '@/config/axiosInstanceConfig'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

declare global {
  interface Window {
    axios: AxiosInstance
    quizApiURL: string
  }
}

window.quizApiURL = 'http://localhost:8001/'

window.axios = axiosInstanceConfig

app.mount('#app')
