<template>
    <main font-mono full-screen overflow-hidden bg-gray-900 flex-center flex-col>
        <header text-xl color-bluegray mb-8>Digtal Life</header>
        <main flex flex-wrap>
            <template v-for="i in  size.height ">
                <div>
                    <template v-for="j in  size.width ">
                        <div :class="{ active: mapBlock[getIndex(i - 1, j - 1)] }" @click="onClick(i - 1, j - 1)"
                            hover:cursor-pointer color-gray-300 hover:bg-gray-500 w-12 h-12 flex-center c-border box-border
                            text-sm>
                        </div>
                    </template>
                </div>
            </template>
        </main>
        <footer color-bluegray mt-8 text-sm>by coffee</footer>
    </main>
</template>

<script setup lang="ts">
import { DataEngine } from '@/assets/ts';
const size = reactive({
    width: 10,
    height: 12
})
const dataEngine = new DataEngine(size.width, size.height)
const onClick = (x: number, y: number) => {
    dataEngine.changeBlockState(x, y)
}
const mapBlock = computed(() => {
    return dataEngine.getData()
})
const getIndex = (x: number, y: number): number => {
    return size.width * y + x
}

</script>

<style scoped>
.active {
    background-color: azure;
    color: black;
}
</style>