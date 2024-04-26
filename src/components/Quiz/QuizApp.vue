<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import QuizQuestion from './QuizQuestion.vue'
import axios from 'axios'

declare interface question {
  id: number
  title: string
  answer: string
}

const id = ref(1)
const questions: Ref<question[]> = ref([])

const quiz = ref({
  title: ref(''),
  questions: questions
})

function addQuestion() {
  questions.value.push({
    id: id.value++,
    title: '',
    answer: ''
  })
}

function deleteQuestion() {
  quiz.value.questions.pop()
  if (id.value > 1) {
    id.value--
  }
}

function saveQuiz() {
  axios
    .post('http://localhost:8001/quiz', quiz.value)
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
</script>

<template>
  <div>
    <form class="flex flex-col">
      <label for="quiz-title">Название квиза</label>
      <input type="text" id="quiz-title" name="quiz-title" v-model="quiz.title" />
      <div class="my-4">
        <input
          class="p-4 bg-green-500 rounded"
          type="button"
          value="Добавить вопрос"
          @click="addQuestion"
          id="add-question-button"
          name="add-question-button"
        />
      </div>
      <QuizQuestion
        class="my-4"
        v-for="q in questions"
        :key="q.id"
        :Id="q.id"
        @question="(msg) => (quiz.questions[q.id - 1].title = msg)"
        @answer="(msg) => (quiz.questions[q.id - 1].answer = msg)"
      />
      <div class="my-4 flex justify-between">
        <input
          class="p-4 bg-blue-500 rounded"
          type="button"
          @click="saveQuiz"
          value="Сохранить квиз"
          id="save-quiz-button"
          name="save-quiz-button"
        />
        <input
          type="button"
          class="p-4 bg-red-500 rounded"
          @click="deleteQuestion"
          value="Удалить вопрос"
          id="delete-question-button"
          name="delete-question-button"
        />
      </div>
    </form>
  </div>
</template>
