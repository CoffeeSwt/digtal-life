<template>
    <main w-screen h-screen overflow-hidden bg-gray-300>
        <header></header>
        <main></main>
        <footer></footer>
    </main>
</template>

<script setup lang="ts">
import { DataEngine } from '@/assets/ts';
const dataEngine = new DataEngine(5, 5)
console.log(dataEngine)
console.log(dataEngine.getData())
</script>

<style scoped></style>