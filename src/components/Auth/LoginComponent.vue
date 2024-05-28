<script setup lang="ts">
import router from '@/router'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ref } from 'vue'

const username = ref('')
const password = ref('')
let token = ''

function login() {
  let loginData = {
    username: username.value,
    password: password.value
  }
  axios
    .post('http://localhost:8001/auth/sign-in', loginData)
    .then((response) => response.data)
    .then(function (response) {
      console.log(response)
      token = JSON.stringify(response)
      try {
        localStorage.setItem('user', token)
        router.push({ name: 'home' })
      } catch (e) {
        Swal.fire({
          title: 'Ошибка',
          text: 'Авторизоваться не удалось',
          icon: 'error'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
      Swal.fire({
        title: 'Ошибка',
        text: 'Неправильный логин или пароль',
        icon: 'error'
      })
    })
}
</script>

<template>
  <form class="flex flex-col">
    <label for="username">Логин</label>
    <input type="string" v-model="username" placeholder="username" name="username" id="username" />
    <label for="password">Пароль</label>
    <input
      type="password"
      v-model="password"
      placeholder="password"
      name="password"
      id="password"
      autocomplete="new-password"
    />
    <button @click.prevent="login" class="p-4 bg-green-500 w-32 rounded mt-5">Войти</button>
  </form>
</template>
