<script setup lang="ts">
import { ref, type PropType } from 'vue'

class ChatMessage {
  type
  body
  constructor(type: String, body: string) {
    this.type = type
    this.body = body
  }
}

const props = defineProps({
  chatHistory: Object as PropType<ChatMessage[]>
})
const messages = ref(props.chatHistory)
</script>

<template>
  <div class="bg-gray-200 m-0 p-[20px]">
    <h2 class="m-0 p-0">Chat History</h2>
    <div>
      <p v-for="(msg, index) in messages" :key="index">{{ msg }}</p>
    </div>
  </div>
</template>
