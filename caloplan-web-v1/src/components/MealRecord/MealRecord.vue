<script setup lang="ts">
import { ref } from "vue";
import TodayMealRecord from "./TodayMealRecord.vue";
import AiRecommend from "./AiRecommend.vue";
import type { MealEntry } from "../../types/MealEntry";

type MockItem = Omit<MealEntry, "id" | "createdAt">;

const todayMealRecordRef = ref<{ openWithEntries: (entries: MockItem[], mealType?: string) => void } | null>(null);

function onAiRecommendAdd(entries: MockItem[]) {
  todayMealRecordRef.value?.openWithEntries(entries);
}
</script>

<template>
  <n-grid x-gap="12" :cols="2">
    <n-gi>
      <TodayMealRecord ref="todayMealRecordRef" />
    </n-gi>
    <n-gi>
      <AiRecommend @add="onAiRecommendAdd" />
    </n-gi>
  </n-grid>
</template>

<style scoped></style>
