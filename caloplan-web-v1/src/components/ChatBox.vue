<script setup lang="ts">
import { ref } from "vue";
import { Menu } from "@vicons/ionicons5";
import ChatList from "./ChatBoxSub/ChatList.vue";
import ChatInput from "./ChatBoxSub/ChatInput.vue";
import DialogAddMeal from "./Dialog/DialogAddMeal.vue";
import type { MealEntry } from "../types/MealEntry";
import type { MealType } from "../types/MealRecord";
import { useMealStore } from "../stores/useMealStore";

const mealStore = useMealStore();
const dialogAddMealVisible = ref(false);
const presetEntries = ref<Omit<MealEntry, "id" | "createdAt">[] | undefined>();
const presetMealType = ref<MealType | undefined>();

function onAddToMeal(data: { mealRecord: any; application: string }) {
  presetEntries.value = data.mealRecord.entries;
  presetMealType.value = data.mealRecord.mealType
  dialogAddMealVisible.value = true;
}

function onDialogUpdateShow(val: boolean) {
  dialogAddMealVisible.value = val;
  if (!val) {
    presetEntries.value = undefined;
    presetMealType.value = undefined;
  }
}
</script>

<template>
  <n-card title="Chatbox">
    <template #header-extra>
      <n-button tertiary circle size="small">
        <n-icon size="24">
          <Menu />
        </n-icon>
      </n-button>
    </template>
    <ChatList @addToMeal="onAddToMeal" />
    <template #footer>
      <ChatInput />
    </template>
  </n-card>

  <DialogAddMeal
    :show="dialogAddMealVisible"
    :preset-entries="presetEntries"
    :preset-meal-type="presetMealType"
    @addMeal="mealStore.onAddMeal"
    @update:show="onDialogUpdateShow"
  />
</template>

<style scoped></style>
