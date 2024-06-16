<script setup lang="ts">
import router from '@/router'
import Swal from 'sweetalert2'
import {ref} from 'vue'
import {useUserStore} from "@/stores/store";

const username = ref('')
const password = ref('')

const store = useUserStore()

function login() {
  let loginData = {
    username: username.value,
    password: password.value
  }
  window.axios
      .post(window.quizApiURL + 'auth/sign-in', loginData)
      .then((response) => response.data)
      .then(function (response) {
        store.login(response)
      })
      .then(() => {
        router.push({name: 'home'})
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
    <input
        class="rounded-md py-2 px-4 text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        type="string" v-model="username" placeholder="username" name="username" id="username"/>
    <label for="password">Пароль</label>
    <input
        class="rounded-md py-2 px-4 text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
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
