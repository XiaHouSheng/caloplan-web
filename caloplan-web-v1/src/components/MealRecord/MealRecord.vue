<script setup lang="ts">
import TodayMealRecord from "./TodayMealRecord.vue";
import AiRecommend from "./AiRecommend.vue";
</script>

<template>
  <n-grid x-gap="12" :cols="2">
    <n-gi>
      <TodayMealRecord />
    </n-gi>
    <n-gi>
      <AiRecommend />
    </n-gi>
  </n-grid>
</template>

<style scoped></style>
