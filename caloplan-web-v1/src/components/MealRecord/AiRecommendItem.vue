<script setup lang="ts">
import { useDialogStore } from "../../stores/useDialogStore";
import type { MealEntry } from "../../types/MealEntry";

const dialogStore = useDialogStore();

const props = defineProps<{
  item: Omit<MealEntry, "id" | "createdAt">;
}>();

function addMealRecord() {
  dialogStore.dialogAddMealVisible = true;
  dialogStore.presetEntries = [props.item];
}

</script>

<template>
  <n-list-item>
    <n-flex :size="0">
      <n-image
        lazy
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        :width="50"
        :height="50"
        style="border-radius: 6px; padding: 8px"
      ></n-image>
      <n-flex :size="0" justify="center" vertical style="flex-grow: 1">
        <n-flex :size="4" align="center" inline>
          <n-text style="font-weight: bold; font-size: 16px">{{
            item.name
          }}</n-text>
          <n-text
            type="primary"
            style="font-size: 18px; font-weight: bold; margin-left: auto"
            >{{ item.kcal }}</n-text
          >
          <n-text type="primary" style="font-size: 18px; font-weight: bold"
            >kcal</n-text
          >
        </n-flex>
        <n-flex align="center">
          <n-text style="font-size: 12px">{{ item.amount }}{{ item.name }}</n-text>
          <n-button style="margin-left: auto" size="small" @click="addMealRecord">添加</n-button>
        </n-flex>
      </n-flex>
    </n-flex>
  </n-list-item>
</template>

<style scoped></style>
