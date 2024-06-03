import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios, { type AxiosInstance } from 'axios'
import { store } from './stores/user'

const app = createApp(App)

app.use(createPinia())
app.use(router)

declare global {
  interface Window {
    axios: AxiosInstance
    serverurl: string
  }
}

window.serverurl = 'http://localhost:8001/'
window.axios = axios.create({
  baseURL: window.serverurl,
  headers: {
    Authorization: 'Bearer ' + store.getters.user.token
  }
})

app.mount('#app')
