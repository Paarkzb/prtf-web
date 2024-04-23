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

const questions: Ref<question[]> = ref([])

function addQuiz() {
  questions.value.push({
    id: id.value++,
    question: '',
    answer: ''
  })
}

function saveQuiz() {
  axios
    .post('http://localhost:8001/quiz', {
      questions: questions.value
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
    {{ questions }}
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
      <div v-for="q in questions" :key="q.id">
        <QuizQuestion
          :Id="q.id"
          @question="(msg) => (questions[q.id - 1].question = msg)"
          @answer="(msg) => (questions[q.id - 1].answer = msg)"
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
