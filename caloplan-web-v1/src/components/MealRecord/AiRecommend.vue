<script setup lang="ts">
import { ref } from "vue";
import AiRecommendItem from "./AiRecommendItem.vue";
import { Refresh } from "@vicons/ionicons5";
import type { MealEntry } from "../../types/MealEntry";
import type { MealType } from "../../types/MealRecord";

type MockItem = Omit<MealEntry, "id" | "createdAt">;

const mockItems = ref<MockItem[]>([
  { name: "鸡胸肉沙拉", amount: "1份", kcal: 320, protein: 35, carbs: 12, fat: 8 },
  { name: "全麦三明治", amount: "1份", kcal: 280, protein: 15, carbs: 40, fat: 6 },
  { name: "希腊酸奶碗", amount: "1碗", kcal: 210, protein: 18, carbs: 22, fat: 5 },
  { name: "三文鱼糙米饭", amount: "1份", kcal: 450, protein: 32, carbs: 45, fat: 14 },
  { name: "蔬菜鸡蛋羹", amount: "1碗", kcal: 160, protein: 12, carbs: 6, fat: 10 },
]);

</script>

<template>
  <n-card>
    <template #header-extra>
      <n-button size="small">
        换一换
        <n-icon :component="Refresh" />
      </n-button>
    </template>
    <template #header>
      <n-text style="font-weight: bold">AI推荐</n-text>
    </template>
    <template #default>
      <n-list style="height: 252px; overflow-y: auto; padding-right: 4px">
        <AiRecommendItem
          v-for="item in mockItems"
          :key="item.name"
          :item="item"
        />
      </n-list>
    </template>
  </n-card>
</template>

<style scoped></style>
