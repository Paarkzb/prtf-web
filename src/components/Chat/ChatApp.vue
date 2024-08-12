<script setup lang="ts">
import { FwbButton } from 'flowbite-vue'
import { onMounted, ref, type Ref } from 'vue'
import ChatHistory from './ChatHistory.vue'

let socket = new WebSocket('ws://localhost:8071/ws')

class ChatMessage {
  type
  body
  constructor(type: String, body: string) {
    this.type = type
    this.body = body
  }
}

const chatHistory: Ref<ChatMessage[]> = ref([])

function connect() {
  console.log('Attempting Connection...')

  socket.onopen = function (e) {
    console.log('Successfully connected', e)
    addMsgToChatHistory(new ChatMessage(e.type, 'New User Joined...'))
  }

  socket.onmessage = function (msg) {
    console.log(msg)
    addMsgToChatHistory(new ChatMessage(msg.type, msg.data))
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
  chatHistory.value.push(msg)
}

onMounted(() => {
  connect()
})
</script>

<template>
  <div>
    <ChatHistory :chatHistory="chatHistory" />
    <fwb-button @click="sendMsg('hello')">Send</fwb-button>
  </div>
</template>
