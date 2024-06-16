<script setup>
import { ref } from 'vue'
import { FwbInput } from 'flowbite-vue'

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
  <div class="flex">
    <div class="p-5 text-white self-center">{{ Index }}</div>
    <div class="flex-1">
      <div class="flex flex-col gap-2">
        <fwb-input
          @input="titleChange"
          :id="'question' + Index"
          :value="titleValue"
          placeholder="Вопрос"
        />

        <fwb-input
          @input="answerChange"
          :id="'answer' + Index"
          :value="answerValue"
          placeholder="Ответ"
        />
      </div>
    </div>
    <div class="p-5 text-white self-center">
      <div>+</div>
      <div>-</div>
    </div>
  </div>
</template>
