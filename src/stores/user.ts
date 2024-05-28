import { createStore } from 'vuex'

export const store = createStore({
  state: {
    user: JSON.parse(String(localStorage.getItem('user')))
  },
  getters: {
    user(state) {
      return state.user
    }
  }
})
