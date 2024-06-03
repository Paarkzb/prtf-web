<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import Swal from 'sweetalert2'
import CreateQuizModal from './QuizModal.vue'
import router from '@/router'

let quizes = ref([] as any)

function getAllQuiz() {
  window.axios
    .get('api/quiz')
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
  window.axios
    .delete('api/quiz/' + id)
    .then((response) => {
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
    .catch((error) => {
      console.log(error)
      Swal.fire({
        title: 'Ошибка',
        text: 'Квиз не удален',
        icon: 'error'
      })
    })
}

onMounted(() => {
  getAllQuiz()
})

const modalTypes = ref(['create', 'edit'])
const showCreateQuizModal = ref(false)
const editId = ref('')
const editName = ref('')
const editDescription = ref('')
const type = ref('')

function showQuizModal(t: string, quiz = { id: '', name: '', description: '', questions: [] }) {
  showCreateQuizModal.value = true
  type.value = t
  editId.value = quiz?.id
  editName.value = quiz?.name
  editDescription.value = quiz?.description
}
</script>

<template>
  <div>
    <CreateQuizModal
      :show="showCreateQuizModal"
      :type="type"
      :editId="editId"
      :editName="editName"
      :editDescription="editDescription"
      @close="showCreateQuizModal = false"
      @save="getAllQuiz()"
    >
    </CreateQuizModal>
  </div>

  <div class="mb-5">
    <div class="flex justify-end">
      <button class="p-4 bg-green-500 rounded" @click="showQuizModal(modalTypes[0])">
        Создать
      </button>
    </div>
  </div>

  <div>
    <table class="w-full text-center">
      <caption class="text-xl font-bold">
        Квизы
      </caption>
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
          <td class="p-2" @click="router.push({ name: 'quizById', params: { id: q.id } })">
            {{ index + 1 }}
          </td>
          <td class="p-2" @click="router.push({ name: 'quizById', params: { id: q.id } })">
            {{ q?.user.username }}
          </td>
          <td class="p-2" @click="router.push({ name: 'quizById', params: { id: q.id } })">
            {{ q?.name }}
          </td>
          <td class="p-2" @click="router.push({ name: 'quizById', params: { id: q.id } })">
            {{ q?.description }}
          </td>
          <td class="p-2" @click="router.push({ name: 'quizById', params: { id: q.id } })">
            {{ q?.questions.length }}
          </td>
          <td class="p-2">
            <button
              class="pr-4 fa fa-pencil fa-lg"
              @click="showQuizModal(modalTypes[1], q)"
            ></button>
            <button class="fa fa-trash fa-lg" @click="deleteQuiz(q.id)"></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
: { id: number }: { id: number }
