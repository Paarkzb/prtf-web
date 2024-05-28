<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="p-4 bg-teal-500">
    <nav class="flex">
      <div class="w-[70%] m-auto flex justify-between">
        <div class="flex gap-x-5">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/quiz">Quiz</RouterLink>
        </div>
        <div>
          <RouterLink to="/login">Войти</RouterLink>
        </div>
      </div>
    </nav>
  </header>
  <main class="mx-auto w-[70%] h-full min-h-[100vh] bg-gray-300 px-10 pt-4">
    <RouterView />
  </main>
</template>
