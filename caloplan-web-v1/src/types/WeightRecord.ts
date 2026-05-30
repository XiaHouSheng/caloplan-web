import { nanoid } from "nanoid";
import { getTodayDate } from "../utils/date";

interface WeightRecord {
  id: string;
  date: string; // YYYY-MM-DD
  weight: number; // kg
  bodyFatRate?: number; // 体脂率（可选）
  createdAt: string;
}

function createWeightRecord(
  raw: Omit<WeightRecord, "id" | "createdAt" | "date">,
): WeightRecord {
  return {
    id: nanoid(),
    date: getTodayDate(),
    weight: raw.weight,
    bodyFatRate: raw.bodyFatRate || undefined,
    createdAt: new Date().toISOString(),
  };
}

function updateWeightRecord(
  weight: number,
  weightRecord: WeightRecord,
): WeightRecord {
  weightRecord.weight = weight;
  return weightRecord;
}

export type { WeightRecord };
export { createWeightRecord, updateWeightRecord };
