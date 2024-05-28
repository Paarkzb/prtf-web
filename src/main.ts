import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import { store } from './stores/user'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.globalProperties.test = axios.create({
  baseURL: 'http://localhost:8001/',
  headers: {
    Authorization: `Bearer ${store.getters.user.token}`
  }
})

app.mount('#app')
