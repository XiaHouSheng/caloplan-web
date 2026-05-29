<script setup>
import TodayCard from "./TodayCard/TodayCard.vue";
import TodayNutrition from "./TodayNutrition/TodayNutrition.vue";
import MealRecord from "./MealRecord/MealRecord.vue";
</script>

<template>
  <n-flex vertical size="large">
    <TodayCard />
    <TodayNutrition />
    <MealRecord />
  </n-flex>
</template>

<style scoped></style>
