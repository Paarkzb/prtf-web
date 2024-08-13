<script setup lang="ts">
import { FwbButton } from 'flowbite-vue'
import { onMounted } from 'vue'
import ChatHistory from './ChatHistory.vue'
import { ChatMessage } from './types'
import { useChatStore } from '@/stores/store'

let socket = new WebSocket('ws://localhost:8071/ws')

const store = useChatStore()

function connect() {
  console.log('Attempting Connection...')

  socket.onopen = function (e) {
    console.log('Successfully connected', e)
  }

  socket.onmessage = function (msg) {
    console.log(msg)
    addMsgToChatHistory(msg.data)
  }

  socket.onclose = function (e) {
    console.log('Socket closed connection: ', e)
  }

  socket.onerror = function (err) {
    console.log('Socket error: ', err)
  }
}

function sendMsg(msg: string) {
  console.log('sending msg: ', msg)
  socket.send(msg)
}

function addMsgToChatHistory(msg: ChatMessage) {
  store.chatHistory.push(msg)
}

onMounted(() => {
  connect()
})
</script>

<template>
  <div>
    <ChatHistory :chatHistory="store.chatHistory" :key="store.chatHistory.length" />
    <fwb-button @click="sendMsg('hello')">Send</fwb-button>
    <fwb-button @click="store.chatHistory = []">Clear chat history</fwb-button>
  </div>
</template>
