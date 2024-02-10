<template>
    <main font-mono full-screen overflow-hidden bg-gray-900 flex-center flex-col>
        <header text-3xl color-bluegray mb-8>Digtal Life</header>
        <div flex>
            <button w-12 h-8 mb-8 flex-center mx-2 @click="start">start</button>
            <button w-12 h-8 mb-8 flex-center mx-2 @click="stop">stop</button>
        </div>
        <div mb-8 text-4xl color-gray-300>{{ times }}</div>

        <div ref="wrapper" flex flex-wrap>
            <template v-for="i in  size.height ">
                <div>
                    <template v-for="j in  size.width ">
                        <div :class="{ active: blockMap[j - 1][i - 1].state }" @click="onClick(i - 1, j - 1)"
                            hover:cursor-pointer color-gray-300 hover:bg-gray-500 w-4 h-4 flex-center c-border box-border
                            text-sm>

                        </div>
                    </template>
                </div>
            </template>
        </div>
        <footer color-bluegray mt-8 text-sm>by coffee</footer>
    </main>
</template>

<script setup lang="ts">
import { type Ref } from 'vue';
import { DataEngine, Clock } from '@/assets/ts';
const size = reactive({
    width: 40,
    height: 40
})
const next = () => {
    dataEngine.value.updataTick()
}
const wrapper: Ref<HTMLDivElement | null> = ref(null)
const dataEngine = ref(new DataEngine(size.width, size.height))
const onClick = (x: number, y: number) => {
    dataEngine.value.changeBlockState(x, y)
}
const blockMap = computed(() => {
    return dataEngine.value.getBlockStateMap()
})
const times = ref(0)
const timer = new Clock(500, () => {
    next()
    times.value++
})
const start = () => {
    timer.start()
}
const stop = () => {
    timer.stop()
}

</script>

<style scoped>
.active {
    background-color: azure;
    color: black;
}
</style>