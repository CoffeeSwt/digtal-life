<template>
    <main full-screen overflow-hidden bg-gray-900 flex-center flex-col>
        <header text-xl color-white mb-8>Digtal Life</header>
        <main w-100 h-100 bg-gray-500>
            <canvas full></canvas>
        </main>
        <footer color-white mt-8 text-sm>by coffee</footer>
    </main>
</template>

<script setup lang="ts">
import { DataEngine } from '@/assets/ts';
const width = 3
const height = 3
const dataEngine = new DataEngine(width, height)
console.log(dataEngine)
console.log(dataEngine.getData())
</script>

<style scoped></style>