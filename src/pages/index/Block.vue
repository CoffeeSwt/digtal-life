<template>
    <div :class="{ active: state }" @click="onClick" hover:cursor-pointer color-gray-300 hover:bg-gray-500 w-12 h-12
        flex-center c-border box-border text-sm>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    x: Number,
    y: Number
})
const emit = defineEmits(['click'])
const state = ref(false)
const onClick = () => {
    emit('click', { ...props })
}

</script>

<style scoped>
.active{
    background-color: azure;
    color: black;
}
</style>