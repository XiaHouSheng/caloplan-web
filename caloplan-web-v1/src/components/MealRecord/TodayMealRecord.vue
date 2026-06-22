<script setup lang="ts">
import MealRecordItem from "./MealRecordItem.vue";
import { Add } from "@vicons/ionicons5";
import { useMealStore } from "../../stores/useMealStore.ts";
import { useDialogStore } from "../../stores/useDialogStore";

const mealStore = useMealStore();
const dialogStore = useDialogStore();

</script>

<template>
  <n-card>
    <template #header-extra>
      <n-button size="small" @click="dialogStore.dialogAddMealVisible = true">
        添加餐食
        <n-icon :component="Add" />
      </n-button>
    </template>
    <template #header>
      <n-text style="font-weight: bold">今日餐食记录</n-text>
    </template>
    <template #default>
      <n-list
        v-if="mealStore.todayMealRecords.length > 0"
        style="
          height: 252px;
          overflow-y: auto;
          overflow-x: hidden;
          padding-right: 4px;
        "
      >
        <MealRecordItem
          v-for="item in mealStore.todayMealRecords"
          :key="item.id"
          :item="item"
          @delete="mealStore.dropTargetRecord(item.id)"
        />
      </n-list>
      <n-empty
        v-else
        description="今天还未记录餐食"
        style="height: 252px; display: flex; flex-direction: column; justify-content: center"
      />
    </template>
  </n-card>
</template>

<style scoped></style>
