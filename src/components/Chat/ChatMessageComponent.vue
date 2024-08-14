<script setup lang="ts">
import { ChatMessage } from './types';

const props = defineProps({
    message: ChatMessage
})

const msg: ChatMessage = props.message!

</script>

<template>
    <div>
        {{ msg.body }}
    </div>
</template>