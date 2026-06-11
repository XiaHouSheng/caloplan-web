import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { formatDate, getWeekDay } from "../utils/date";
import { type MealEntry, createMealEntry } from "../types/MealEntry";
import {
  type MealRecord,
  type ExpendRecord,
  createMealRecord,
  createExpendRecord,
} from "../types/MealRecord";
export const useMealStore = defineStore(
  "meal",
  () => {
    const mealRecords = ref<MealRecord[]>([]);
    const mealEntries = ref<MealEntry[]>([]);
    const expendRecords = ref<ExpendRecord[]>([]);

    const todayMealRecords = computed(() => {
      return mealRecords.value.filter(
        (record) => record.date === formatDate(new Date()),
      );
    });

    const day7ExpendData = computed(() => {
      let totalKcal: number = 0;
      let effectiveDay: number = 0;
      let ylabel: any[] = [];
      for (let i = 1; i < 8; i++) {
        let day = getWeekDay(i);
        let record = expendRecords.value.find((record) => record.date === day);
        if (record) {
          let kcal = record.kcal;
          totalKcal += kcal;
          effectiveDay += 1;
          ylabel.push(kcal);
        } else {
          ylabel.push(null);
        }
      }
      console.log("day7ExpendData", expendRecords.value);
      return {
        average: totalKcal / effectiveDay,
        sum: totalKcal,
        ylabel,
      };
    });

    const day7KcalData = computed(() => {
      let kcal: number = 0;
      let effectiveDay: number = 0;
      let ylabel: any[] = [];
      for (let i = 1; i < 8; i++) {
        let day = getWeekDay(i);
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
          effectiveDay += 1;
          ylabel.push(totalKcal);
        } else {
          ylabel.push(null);
        }
      }
      return {
        average: kcal / effectiveDay,
        sum: kcal,
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
      console.log(mealEntries.value);
      let existEntry = mealEntries.value.find(
        (e) => e.name.trim() === entry.name,
      );
      if (existEntry) {
        return existEntry;
      }
      let newEntry = createMealEntry(entry);
      mealEntries.value.push(newEntry);
      return newEntry;
    }

    function addRecord(record: Omit<MealRecord, "id" | "createdAt">) {
      mealRecords.value.push(createMealRecord(record));
    }

    function updateTodayExpend(kcal: number) {
      let date = formatDate(new Date());
      let record = expendRecords.value.find((record) => record.date === date);
      if (record) {
        record.kcal = kcal;
      } else {
        let newRecord = createExpendRecord({ kcal: kcal });
        expendRecords.value.push(newRecord);
      }
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
      expendRecords,
      todayMealRecords,
      day7KcalData,
      day7ExpendData,
      todayNutritionSum,
      addEntry,
      addRecord,
      dropTargetRecord,
      dropTargetEntry,
      updateTodayExpend,
    };
  },
  {
    persist: {
      key: "meal-store",
      storage: localStorage,
      pick: ["mealRecords", "mealEntries", "expendRecords"],
    },
  },
);
