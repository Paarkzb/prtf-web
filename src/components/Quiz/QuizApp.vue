<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import QuizQuestion from './QuizQuestion.vue'
import axios from 'axios'

const id = ref(1)

declare interface question {
  id: number
  question: string
  answer: string
}

const quizes: Ref<question[]> = ref([])

function addQuiz() {
  quizes.value.push({
    id: id.value++,
    question: '',
    answer: ''
  })
}

function saveQuiz() {
  axios
    .post('http://localhost:8001/quiz', {
      quizes: quizes.value
    })
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
    {{ quizes }}
    <form>
      <div class="mb-5">
        <input
          type="button"
          value="Добавить вопрос"
          @click="addQuiz"
          id="add-quiz-button"
          name="add-quiz-button"
        />
      </div>
      <div v-for="quiz in quizes" :key="quiz.id">
        <QuizQuestion
          :Id="quiz.id"
          @question="(msg) => (quizes[quiz.id - 1].question = msg)"
          @answer="(msg) => (quizes[quiz.id - 1].answer = msg)"
        />
      </div>
      <div>
        <input
          type="button"
          @click="saveQuiz"
          value="Сохранить квиз"
          id="save-quiz-button"
          name="save-quiz-button"
        />
      </div>
    </form>
  </div>
</template>
