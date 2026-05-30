import { defineStore } from "pinia";
import { ref } from "vue";
import type { AiRecommendItem } from "../types/AiRecommendation";

export const useAiRecommendStore = defineStore("aiRecommend", () => {
  const items = ref<AiRecommendItem[]>([]);

  function refresh(newItems: AiRecommendItem[]) {
    items.value = newItems;
  }

  return {
    items,
    refresh,
  };
});
