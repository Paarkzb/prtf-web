<script setup lang="ts">
import { FwbInput } from 'flowbite-vue'

const props = defineProps({
  send: {
    type: Function
  }
})
</script>

<template>
  <div>
    <!-- <fwb-input placeholder="Написать" label="Сообщение" @keyup.enter="props.send" /> -->
    <input placeholder="Написать" label="Сообщение" @keydown.enter="props.send" />
  </div>
</template>
