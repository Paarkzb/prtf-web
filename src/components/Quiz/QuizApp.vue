<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import CreateQuizModal from './CreateQuizModal.vue'
import router from '@/router'
import { store } from '@/stores/user'

let quizes = ref([] as any)

function getAllQuiz() {
  let config = {
    headers: {
      Authorization: 'Bearer ' + store.getters.user.token
    }
  }

  axios
    .get('http://localhost:8001/api/quiz', config)
    .then((data) => data.data)
    .then(function (response) {
      console.log(response)
      quizes.value = response.data
    })
    .catch(function (error) {
      console.log(error)
      Swal.fire({
        title: 'Ошибка',
        text: 'Квизы не получены',
        icon: 'error'
      })
    })
}

function deleteQuiz(id: string) {
  let config = {
    headers: {
      Authorization: 'Bearer ' + store.getters.user.token
    }
  }

  axios.delete('http://localhost:8001/api/quiz/' + id, config).then((response) => {
    if (response.status == 200) {
      Swal.fire({
        title: 'Удачно',
        text: 'Квиз удален',
        icon: 'success'
      })
      getAllQuiz()
    } else {
      Swal.fire({
        title: 'Ошибка',
        text: 'Квиз не удален',
        icon: 'error'
      })
    }
  })
}

onMounted(() => {
  getAllQuiz()
})

const showCreateQuizModal = ref(false)
</script>

<template>
  <div class="mb-5">
    <div class="flex justify-end">
      <button class="p-4 bg-green-500 rounded" @click="showCreateQuizModal = true">Создать</button>
    </div>
  </div>
  <div>
    <CreateQuizModal
      :show="showCreateQuizModal"
      @close="showCreateQuizModal = false"
      @save="getAllQuiz()"
    >
    </CreateQuizModal>
  </div>
  <div>
    <table class="w-full text-center">
      <thead class="py-2 bg-slate-400 text-base">
        <tr class="divide-x divide-black">
          <th class="p-2">#</th>
          <th class="p-2">Создатель</th>
          <th class="p-2">Название</th>
          <th class="p-2">Описание</th>
          <th class="p-2">Количество вопросов</th>
          <th class="p-2">Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(q, index) in quizes" :key="q.id" class="divide-x divide-black">
          <td class="p-2">{{ index + 1 }}</td>
          <td class="p-2">{{ q?.rf_user_id }}</td>
          <td class="p-2">{{ q?.name }}</td>
          <td class="p-2">{{ q?.description }}</td>
          <td class="p-2"></td>
          <td class="p-2">
            <button
              class="pr-4 fa fa-pencil fa-lg"
              @click="router.push({ name: 'quizById', params: { id: q.id } })"
            ></button>
            <button class="fa fa-trash fa-lg" @click="deleteQuiz(q.id)"></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
