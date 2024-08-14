<script setup lang="ts">

const props = defineProps({
    send: {
        type: Function,
        default() {
            return 'Default function'
        }
    }
})

</script>

<template>
    <div>
        <input type="text" @keydown="props.send">
    </div>
</template>