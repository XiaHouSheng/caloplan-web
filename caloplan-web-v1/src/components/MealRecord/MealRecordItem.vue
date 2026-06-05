<script setup lang="ts">
import { type MealRecord } from "../../types/MealRecord.ts";

const props = defineProps({
  item: {
    type: Object as () => MealRecord,
    default: () => {},
  },
});
const sumKcal = props.item.entries.reduce((acc, cur) => acc + cur.kcal, 0);
const content = props.item.entries
  .map((item) => item.amount + item.name)
  .join(" + ");
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
            props.item.mealType
          }}</n-text>
          <n-text
            type="primary"
            style="font-size: 18px; font-weight: bold; margin-left: auto"
            >{{ sumKcal }}</n-text
          >
          <n-text type="primary" style="font-size: 18px; font-weight: bold"
            >kcal</n-text
          >
        </n-flex>
        <n-flex inline align="center">
          <n-text
            style="
              font-size: 12px;
              text-overflow: ellipsis;
              max-width: 220px;
              white-space: nowrap;
              overflow: hidden;
            "
            >{{ content }}</n-text
          >
          <n-text style="margin-left: auto">{{ props.item.time }}</n-text>
        </n-flex>
      </n-flex>
    </n-flex>
  </n-list-item>
</template>

<style scoped></style>
