import { defineStore } from 'pinia'
import { ChatMessage } from '@/components/Chat/types'

interface User {
  id: string
  name: string
  username: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogged: false,
    user: {
      id: '',
      name: '',
      username: ''
    }
  }),
  actions: {
    login(user: User) {
      this.isLogged = true
      this.user = user
    },
    logout() {
      this.isLogged = false
    }
  },
  persist: true
})

export const useChatStore = defineStore('chat', {
  state: () => ({
    chatHistory: <ChatMessage[]>[]
  }),
  persist: true
})
