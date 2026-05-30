<script setup lang="ts">
import MealRecordItem from "./MealRecordItem.vue";
import { Add } from "@vicons/ionicons5";
import { useMealStore } from "../../stores/useMealStore.ts";

const mealStore = useMealStore();
</script>

<template>
  <n-card>
    <template #header-extra>
      <n-button size="small">
        添加餐食
        <n-icon :component="Add" />
      </n-button>
    </template>
    <template #header>
      <n-text style="font-weight: bold">今日餐食记录</n-text>
    </template>
    <template #default>
      <n-list style="height: 252px; overflow-y: auto; padding-right: 4px">
        <MealRecordItem v-for="item in mealStore.todayMealRecords" :key="item.id" :item="item" />
      </n-list>
    </template>
  </n-card>
</template>

<style scoped></style>
