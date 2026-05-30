import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getTodayDate } from "../utils/date";
import { type WeightRecord, createWeightRecord, updateWeightRecord } from "../types/WeightRecord";

export const useWeightRecordStore = defineStore(
  "weightRecord",
  () => {
    // 初始化体重记录
    const weightRecords = ref<WeightRecord[]>([]);
    // 获取今日体重记录
    const todayWeightRecord = computed(() => {
      return weightRecords.value.find(
        (record) => record.date === getTodayDate(),
      );
    });
    // 添加体重记录
    const addWeightRecord = (
      record: Omit<WeightRecord, "id" | "createdAt" | "date">,
    ) => {
      weightRecords.value.push(createWeightRecord(record));
    };

    // 删除体重记录
    const deleteWeightRecord = (id: string) => {
      weightRecords.value = weightRecords.value.filter(
        (record) => record.id !== id,
      );
    };

    // 清空体重记录
    const clearWeightRecords = () => {
      weightRecords.value = [];
    };

    // 获取所有体重记录
    const getAllWeightRecords = () => {
      return weightRecords.value;
    };

    // 更新今日体重记录
    const updateTodayWeight = (weight: number) => {
      if (!todayWeightRecord.value) {
        return;
      }
      let newWeightRecord = updateWeightRecord(weight, todayWeightRecord.value!);
      weightRecords.value = weightRecords.value.map((item) =>
        item.id === newWeightRecord.id ? newWeightRecord : item,
      );
    };

    return {
      weightRecords,
      todayWeightRecord,
      updateTodayWeight,
      addWeightRecord,
      deleteWeightRecord,
      clearWeightRecords,
      getAllWeightRecords,
    };
  },
  {
    persist: {
      key: "weight-record-store",
      storage: localStorage,
      pick: ["weightRecords"],
    },
  },
);
