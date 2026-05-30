import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { formatDate } from "../utils/date";
import { type MealEntry, createMealEntry } from "../types/MealEntry";
import { type MealRecord, createMealRecord } from "../types/MealRecord";
export const useMealStore = defineStore("meal", () => {
  const mealRecords = ref<MealRecord[]>([]);
  const mealEntries = ref<MealEntry[]>([]);
  const todayMealRecords = computed(() => {
    return mealRecords.value.filter(
      (record) => record.date === formatDate(new Date()),
    );
  });

  const day7KcalData = computed(() => {
    let kcal: number = 0;
    let xlabel: string[] = [];
    let ylabel: number[] = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000);
      let day = formatDate(date);
      let records = mealRecords.value.filter((record) => record.date === day);
      if (records.length > 0) {
        let totalKcal = 0;
        for (let record of records) {
          totalKcal += record.entries.reduce(
            (acc, cur) => acc + (cur.kcal || 0),
            0,
          );
        }
        kcal += totalKcal;
        xlabel.push(formatDate(date, false));
        ylabel.push(totalKcal);
      }
    }
    return {
      average: kcal / 7,
      sum: kcal,
      xlabel,
      ylabel,
    };
  });

  const todayNutritionSum = computed(() => {
    let protein: number = 0;
    let carbs: number = 0;
    let fat: number = 0;
    let kcal: number = 0;
    todayMealRecords.value.forEach((record) => {
      record.entries.forEach((entry) => {
        protein += entry.protein || 0;
        carbs += entry.carbs || 0;
        fat += entry.fat || 0;
        kcal += entry.kcal || 0;
      });
    });
    return {
      protein,
      carbs,
      fat,
      kcal,
    };
  });

  function addEntry(entry: Omit<MealEntry, "id" | "createdAt">) {
    mealEntries.value.push(createMealEntry(entry));
  }

  function addRecord(record: Omit<MealRecord, "id" | "createdAt">) {
    mealRecords.value.push(createMealRecord(record));
  }

  function dropTargetRecord(recordId: string) {
    mealRecords.value = mealRecords.value.filter(
      (record) => record.id !== recordId,
    );
  }

  function dropTargetEntry(entryId: string) {
    mealEntries.value = mealEntries.value.filter(
      (entry) => entry.id !== entryId,
    );
  }
  
  return {
    mealRecords,
    mealEntries,
    todayMealRecords,
    day7KcalData,
    todayNutritionSum,
    addEntry,
    addRecord,
    dropTargetRecord,
    dropTargetEntry,
  };
}, {
  persist: {
    key: "meal-store",
    storage: localStorage,
    pick: ["mealRecords", "mealEntries"],
  },
});
