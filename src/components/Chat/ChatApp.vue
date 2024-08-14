<script setup lang="ts">
import { FwbButton } from 'flowbite-vue'
import { onMounted } from 'vue'
import ChatHistoryComponent from './ChatHistoryComponent.vue'
import { ChatMessage } from './types'
import { useChatStore } from '@/stores/store'
import ChatInput from './ChatInput.vue'

let socket = new WebSocket('ws://localhost:8071/ws')

const store = useChatStore()

function connect() {
  console.log('Attempting Connection...')

  socket.onopen = function (e) {
    console.log('Successfully connected', e)
  }

  socket.onmessage = function (msg) {
    console.log(msg)
    let message: ChatMessage = JSON.parse(msg.data)
    addMsgToChatHistory(message)
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

function send(event: KeyboardEvent) {
  const el = event.target as HTMLInputElement
  if (event.code === 'Enter') {
    sendMsg(el.value)
    el.value = ''
  }
}

onMounted(() => {
  connect()
})
</script>

<template>
  <div>
    <ChatHistoryComponent :chatHistory="store.chatHistory" :key="store.chatHistory.length" />
    <ChatInput :send="send" />
    <fwb-button @click="sendMsg('hello')">Send</fwb-button>
    <fwb-button @click="store.chatHistory = []">Clear chat history</fwb-button>
  </div>
</template>
