<script setup lang="ts">
import axios from 'axios'
import Swal from 'sweetalert2'
import { ref } from 'vue'

const props = defineProps({
  show: Boolean
})
const emit = defineEmits(['save', 'close'])

const name = ref('')
const description = ref('')

function saveQuiz() {
  let user = JSON.parse(localStorage.getItem('user') || '')
  let config = {
    headers: {
      Authorization: 'Bearer ' + user.token
    }
  }

  let quiz = {
    name: name.value,
    description: description.value,
    questions: []
  }

  axios
    .post('http://localhost:8001/api/quiz', quiz, config)
    .then(function (response) {
      if (response.status === 201) {
        emit('save')
        emit('close')
        Swal.fire({
          title: 'Успех',
          text: 'Квиз сохранен',
          icon: 'success'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
      Swal.fire({
        title: 'Ошибка',
        text: 'Квиз не сохранен',
        icon: 'error'
      })
    })
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <div class="text-center">
            <span class="text-xl">Создание квиза</span>
            <button
              class="modal-default-button float-right fa fa-times"
              @click="$emit('close')"
            ></button>
          </div>
        </div>
        <div class="modal-body">
          <form class="flex flex-col">
            <label for="quiz-title">Название квиза</label>
            <input
              class="rounded-md py-2 px-4 text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              type="text"
              id="quiz-title"
              name="quiz-title"
              v-model="name"
            />
            <label for="quiz-title">Описание квиза</label>
            <input
              class="rounded-md py-2 px-4 text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              type="text"
              id="quiz-title"
              name="quiz-title"
              v-model="description"
            />
          </form>
        </div>
        <div class="modal-footer">
          <div class="text-center">
            <input
              class="p-4 bg-blue-500 rounded text-center"
              type="button"
              @click="saveQuiz"
              value="Сохранить квиз"
              id="save-quiz-button"
              name="save-quiz-button"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 50%;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  bottom: 0;
  left: 0;
  right: 0;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
