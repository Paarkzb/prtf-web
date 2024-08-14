<script setup lang="ts">
import { ChatMessage } from './types'
import ChatMessageComponent from './ChatMessageComponent.vue'
import { ref, type PropType } from 'vue'

const props = defineProps({
  chatHistory: Object as PropType<ChatMessage[]>
})
const messages = ref(props.chatHistory)
</script>

<template>
  <div class="bg-gray-200 m-0 p-[20px]">
    <h2 class="m-0 p-0">Chat History</h2>
    <div>
      
      <p v-for="(msg, index) in messages" :key="index">
        <ChatMessageComponent :message="msg"/>
      </p>
    </div>
  </div>
</template>
