<script setup>
import { ref } from 'vue'

const props = defineProps({
  Index: Number,
  Title: String,
  Answer: String
})

const emit = defineEmits(['title', 'answer'])

const titleValue = ref(props.Title)
const answerValue = ref(props.Answer)

function titleChange(e) {
  titleValue.value = e.target.value
  emit('title', titleValue)
}

function answerChange(e) {
  answerValue.value = e.target.value
  emit('answer', answerValue)
}
</script>

<template>
  <div class="flex flex-col">
    <label for="question">Вопрос {{ Index }}</label>
    <input
      type="text"
      name="question"
      @input="titleChange"
      :id="'question' + Index"
      :value="titleValue"
    />
    <label for="answer">Ответ {{ Index }}</label>
    <input
      type="text"
      name="answer"
      @input="answerChange"
      :id="'answer' + Index"
      :value="answerValue"
    />
  </div>
</template>
