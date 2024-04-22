<script setup>
import { ref } from 'vue'

defineProps({
  Id: Number
})

const emit = defineEmits(['question', 'answer'])

const questionValue = ref('')
const answerValue = ref('')

function questionChange(e) {
  questionValue.value = e.target.value
  emit('question', questionValue)
}

function answerChange(e) {
  answerValue.value = e.target.value
  emit('answer', answerValue)
}
</script>

<template>
  <div>
    <div class="mb-5 flex gap-x-5">
      <label for="question">Вопрос</label>
      <input
        type="text"
        name="question"
        @input="questionChange"
        :id="'question' + Id"
        :value="questionValue"
      />
    </div>
    <div class="mb-5 flex gap-x-5">
      <label for="answer">Ответ</label>
      <input
        type="text"
        name="answer"
        @input="answerChange"
        :id="'answer' + Id"
        :value="answerValue"
      />
    </div>
  </div>
</template>
