import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  getTodayDate,
  getYesterdayDate,
  getWeekDay,
  convertToDate,
} from "../utils/date";
import {
  type WeightRecord,
  createWeightRecord,
  updateWeightRecord,
} from "../types/WeightRecord";

export const useWeightRecordStore = defineStore(
  "weightRecord",
  () => {
    // 初始化体重记录
    const weightRecords = ref<WeightRecord[]>([]);
    // 获取最新体重记录
    const latestWeightRecord = computed(() => {
      return weightRecords.value[weightRecords.value.length - 1];
    });
    // 获取今日体重记录
    const todayWeightRecord = computed(() => {
      return weightRecords.value.find(
        (record) => record.date === getTodayDate(),
      );
    });
    // 获取昨日体重记录
    const yesterdayWeightRecord = computed(() => {
      return weightRecords.value.find(
        (record) => record.date === getYesterdayDate(),
      );
    });

    // 获取一周体重记录
    const weekWeightRecords = computed(() => {
      let records = []
      for (let i = 0; i < 7; i++) {
        records.push(weightRecords.value.find(
          (record) => record.date === getWeekDay(i),
        ) || null)
      }
      return records
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
      let newWeightRecord = updateWeightRecord(
        weight,
        todayWeightRecord.value!,
      );
      weightRecords.value = weightRecords.value.map((item) =>
        item.id === newWeightRecord.id ? newWeightRecord : item,
      );
    };

    return {
      weightRecords,
      todayWeightRecord,
      yesterdayWeightRecord,
      latestWeightRecord,
      weekWeightRecords,
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
