<script setup>
import NSubAverage from "./NSubAverage.vue";
import NSubTodayEat from "./NSubTodayEat.vue";
</script>

<template>
    <n-grid x-gap="12" :cols="2">
        <n-gi>
            <NSubTodayEat />
        </n-gi>
        <n-gi>
            <NSubAverage />
        </n-gi>
    </n-grid>
</template>

<style scoped></style>
