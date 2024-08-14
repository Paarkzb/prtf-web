<script setup lang="ts">
import { ChatMessage } from './types'
import ChatMessageComponent from './ChatMessageComponent.vue'
import { type PropType } from 'vue'

const props = defineProps({
  chatHistory: Array as PropType<ChatMessage[]>
})
</script>

<template>
  <div class="bg-gray-200 m-0 p-[20px]">
    <h2 class="text-center text-lg bg-gray-300 m-0 p-0">История чата</h2>
    <div>
      <p v-for="(msg, index) in props.chatHistory" :key="index">
        <ChatMessageComponent :message="msg" />
      </p>
    </div>
  </div>
</template>
