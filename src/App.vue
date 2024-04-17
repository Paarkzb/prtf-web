<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template >
  <main class="ml-32">
    <header class="p-4 ml-32">
      <nav class="flex gap-x-5">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/quiz">Quiz</RouterLink>
      </nav>
    </header>

    <RouterView />
  </main>
</template>
