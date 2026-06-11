<script setup lang="ts">
import { ref } from "vue";
import MealRecordItem from "./MealRecordItem.vue";
import { Add } from "@vicons/ionicons5";
import { useMealStore } from "../../stores/useMealStore.ts";
import type { MealType } from "../../types/MealRecord.ts";
import type { MealEntry } from "../../types/MealEntry";
import DialogAddMeal from "../Dialog/DialogAddMeal.vue";
import { formatDate, getTimeStr } from "../../utils/date.ts";

const mealStore = useMealStore();

// 对话框控制
const dialogAddMealVisible = ref(false);
const presetEntries = ref<Omit<MealEntry, "id" | "createdAt">[] | undefined>();
const presetMealType = ref<MealType>();

function openWithEntries(
  entries: Omit<MealEntry, "id" | "createdAt">[],
  mealType?: MealType,
) {
  presetEntries.value = entries;
  presetMealType.value = mealType;
  dialogAddMealVisible.value = true;
}

function onDialogUpdateShow(val: boolean) {
  dialogAddMealVisible.value = val;
  if (!val) {
    // 关闭后清除预填
    presetEntries.value = undefined;
    presetMealType.value = undefined;
  }
}

defineExpose({ openWithEntries });

function onAddMeal(data: {
  mealType: MealType;
  time: string;
  entries: {
    name: string;
    amount: string;
    kcal: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  }[];
}) {
  const { mealType, time, entries } = data;
  let date = formatDate(new Date(time));
  let time_ = getTimeStr(new Date(time));
  let entriesDuplicate = [];
  for (const entry of entries) {
    let entryObj = mealStore.addEntry(entry);
    entriesDuplicate.push(entryObj);
  }
  mealStore.addRecord({
    mealType: mealType,
    date: date,
    time: time_,
    entries: entriesDuplicate,
  });
}

function onDeleteMeal(id: string) {
  mealStore.dropTargetRecord(id);
}
</script>

<template>
  <DialogAddMeal
    :show="dialogAddMealVisible"
    :preset-entries="presetEntries"
    :preset-meal-type="presetMealType"
    @addMeal="onAddMeal"
    @update:show="onDialogUpdateShow"
  />
  <n-card>
    <template #header-extra>
      <n-button size="small" @click="dialogAddMealVisible = true">
        添加餐食
        <n-icon :component="Add" />
      </n-button>
    </template>
    <template #header>
      <n-text style="font-weight: bold">今日餐食记录</n-text>
    </template>
    <template #default>
      <n-list
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
          @delete="onDeleteMeal"
        />
      </n-list>
    </template>
  </n-card>
</template>

<style scoped></style>
